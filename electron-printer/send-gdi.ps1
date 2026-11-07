param([Parameter(Mandatory = $true)][string]$PrinterName)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$base64 = [Console]::In.ReadToEnd().Trim()
if (-not $base64) { throw 'La boleta esta vacia' }
$order = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($base64)) | ConvertFrom-Json
if (-not $order.client -or -not $order.items) { throw 'Pedido incompleto para imprimir' }
$doc = New-Object System.Drawing.Printing.PrintDocument
$doc.PrinterSettings.PrinterName = $PrinterName
if (-not $doc.PrinterSettings.IsValid) { throw "No se encontro la impresora $PrinterName" }
$doc.PrintController = New-Object System.Drawing.Printing.StandardPrintController
$doc.OriginAtMargins = $false
$doc.DefaultPageSettings.Margins = New-Object System.Drawing.Printing.Margins(0, 0, 0, 0)

$fontHeader = New-Object Drawing.Font('Calibri', 13, [Drawing.FontStyle]::Bold)
$fontNormal = New-Object Drawing.Font('Calibri', 10.5, [Drawing.FontStyle]::Regular)
$fontBold = New-Object Drawing.Font('Calibri', 10.5, [Drawing.FontStyle]::Bold)
$fontSmall = New-Object Drawing.Font('Calibri', 9.5, [Drawing.FontStyle]::Regular)
$fontTotal = New-Object Drawing.Font('Calibri', 12, [Drawing.FontStyle]::Bold)
$fonts = @($fontHeader, $fontNormal, $fontBold, $fontSmall, $fontTotal)
$measureBitmap = New-Object Drawing.Bitmap(1, 1)
$measure = [Drawing.Graphics]::FromImage($measureBitmap)
$measure.PageUnit = [Drawing.GraphicsUnit]::Display
$entries = New-Object 'System.Collections.Generic.List[object]'
$script:y = 0.0
$left = 0.0
$width = 280.0

function Add-Text([string]$value, $font, [double]$x, [double]$w, [string]$align, [double]$gap) {
    if (-not $value) { return }
    $size = $measure.MeasureString($value, $font, [Drawing.SizeF]::new($w, 10000))
    $h = [Math]::Ceiling($size.Height)
    $entries.Add(@{ Type='text'; Text=$value; Font=$font; X=$x; Y=$script:y; W=$w; H=$h; Align=$align })
    $script:y += $h + $gap
}

function Add-Pair([string]$a, [string]$b, $font, [double]$gap) {
    $aWidth = 180.0
    $bWidth = $width - $aWidth
    $aSize = $measure.MeasureString($a, $font, [Drawing.SizeF]::new($aWidth, 10000))
    $bSize = $measure.MeasureString($b, $font, [Drawing.SizeF]::new($bWidth, 10000))
    $h = [Math]::Ceiling([Math]::Max($aSize.Height, $bSize.Height))
    $entries.Add(@{ Type='text'; Text=$a; Font=$font; X=$left; Y=$script:y; W=$aWidth; H=$h; Align='left' })
    $entries.Add(@{ Type='text'; Text=$b; Font=$font; X=($left + $aWidth); Y=$script:y; W=$bWidth; H=$h; Align='right' })
    $script:y += $h + $gap
}

function Add-TableRow([string]$name, [string]$qty, [string]$unit, [string]$total, $nameFont, $numberFont, [double]$gap) {
    $columns = @(
        @{ Text=$name; X=0.0; W=115.0; Font=$nameFont; Align='left' },
        @{ Text=$qty; X=115.0; W=45.0; Font=$numberFont; Align='center' },
        @{ Text=$unit; X=160.0; W=55.0; Font=$numberFont; Align='right' },
        @{ Text=$total; X=215.0; W=55.0; Font=$numberFont; Align='right' }
    )
    $height = 0.0
    foreach ($column in $columns) {
        $size = $measure.MeasureString($column.Text, $column.Font, [Drawing.SizeF]::new($column.W, 10000))
        $column.H = [Math]::Ceiling($size.Height)
        $height = [Math]::Max($height, $column.H)
    }
    foreach ($column in $columns) {
        $entries.Add(@{ Type='text'; Text=$column.Text; Font=$column.Font; X=$column.X; Y=$script:y; W=$column.W; H=$height; Align=$column.Align })
    }
    $script:y += $height + $gap
}

function Add-Rule {
    $script:y += 3
    $entries.Add(@{ Type='rule'; Y=$script:y })
    $script:y += 6
}

Add-Text ('DISTRIBUIDORA TR' + [char]0x00C9 + 'BOL') $fontHeader $left $width 'center' 0
Add-Text ('Distribuci' + [char]0x00F3 + 'n y comercio externo') $fontSmall $left $width 'center' 0
Add-Text 'Contacto' $fontSmall $left $width 'center' 0
Add-Text '73750520-67519917' $fontSmall $left $width 'center' 1
Add-Rule
Add-Text "Pedido #$($order.id)" $fontBold $left $width 'left' 1
$seller = if ($order.preventista.name) { $order.preventista.name } elseif ($order.distributor.name) { $order.distributor.name } else { 'Distribucion' }
Add-Text "Vendedor: $seller" $fontNormal $left $width 'left' 1
$rawDate = if ($order.deliveredAt) { $order.deliveredAt } else { $order.createdAt }
if ($rawDate) { Add-Text ('Fecha entrega: ' + ([DateTime]$rawDate).ToString('dd/MM/yyyy HH:mm')) $fontNormal $left $width 'left' 1 }
Add-Text "Cliente: $($order.client.name)" $fontBold $left $width 'left' 1
if ($order.client.phone) { Add-Text "Contacto: $($order.client.phone)" $fontNormal $left $width 'left' 1 }
if ($order.client.address) { Add-Text "Direccion: $($order.client.address)" $fontNormal $left $width 'left' 1 }
Add-Rule
Add-TableRow 'Descripcion' 'CANT' 'P.U.' 'total' $fontBold $fontBold 1
Add-Rule

$subtotal = 0.0
$bonus = @()
foreach ($item in $order.items) {
    if ($item.isBonification) { $bonus += $item; continue }
    $qty = if ($null -ne $item.deliveredQuantity) { [double]$item.deliveredQuantity } else { [double]$item.quantity }
    $price = [double]$item.unitPrice
    $subtotal += $qty * $price
    $name = if ($item.product.name) { $item.product.name } else { 'Producto' }
    Add-TableRow $name ("x{0}" -f $qty) ("{0:N2}" -f $price) ("{0:N2}" -f ($qty * $price)) $fontNormal $fontSmall 2
}
if ($bonus.Count -gt 0) {
    Add-Rule
    Add-Text 'BONIFICACIONES (GRATIS)' $fontBold $left $width 'left' 1
    foreach ($item in $bonus) {
        $name = if ($item.product.name) { $item.product.name } else { 'Producto' }
        Add-Pair $name ("x{0} GRATIS" -f $item.quantity) $fontSmall 1
    }
}
Add-Rule
$discount = [double]$order.discount
if ($discount -gt 0) {
    Add-Pair 'Subtotal:' ("Bs {0:N2}" -f $subtotal) $fontNormal 1
    Add-Pair 'Descuento:' ("-Bs {0:N2}" -f $discount) $fontNormal 1
}
Add-Pair 'TOTAL:' ("Bs {0:N2}" -f [Math]::Max(0, $subtotal - $discount)) $fontTotal 2
if ($order.notes) { Add-Text "Obs: $($order.notes)" $fontSmall $left $width 'left' 1 }
Add-Rule
Add-Text 'Gracias por su compra' $fontNormal $left $width 'center' 0
$script:y += 3
$entries.Add(@{ Type='clovers'; Y=$script:y })
$script:y += 28
$script:y += 4
$entries.Add(@{ Type='rule'; Y=$script:y })
$paperHeight = [int][Math]::Ceiling($script:y + 2)
$doc.DefaultPageSettings.PaperSize = New-Object Drawing.Printing.PaperSize('Boleta Trebol', 315, $paperHeight)

$handler = [Drawing.Printing.PrintPageEventHandler] {
    param($sender, $e)
    $e.Graphics.PageUnit = [Drawing.GraphicsUnit]::Display
    foreach ($entry in $entries) {
        if ($entry.Type -eq 'rule') {
            $e.Graphics.DrawLine([Drawing.Pens]::Black, $left, $entry.Y, ($left + $width), $entry.Y)
            continue
        }
        if ($entry.Type -eq 'clovers') {
            foreach ($x in @(110.0, 146.0)) {
                $e.Graphics.FillEllipse([Drawing.Brushes]::Black, ($x + 8), $entry.Y, 10, 10)
                $e.Graphics.FillEllipse([Drawing.Brushes]::Black, ($x + 2), ($entry.Y + 6), 10, 10)
                $e.Graphics.FillEllipse([Drawing.Brushes]::Black, ($x + 14), ($entry.Y + 6), 10, 10)
                $e.Graphics.FillRectangle([Drawing.Brushes]::Black, ($x + 12), ($entry.Y + 15), 2, 11)
            }
            continue
        }
        $format = New-Object Drawing.StringFormat
        if ($entry.Align -eq 'center') { $format.Alignment = [Drawing.StringAlignment]::Center }
        if ($entry.Align -eq 'right') { $format.Alignment = [Drawing.StringAlignment]::Far }
        $rect = [Drawing.RectangleF]::new($entry.X, $entry.Y, $entry.W, $entry.H)
        $e.Graphics.DrawString($entry.Text, $entry.Font, [Drawing.Brushes]::Black, $rect, $format)
        $format.Dispose()
    }
    $e.HasMorePages = $false
}
$doc.add_PrintPage($handler)
try { $doc.Print() } finally {
    $doc.Dispose()
    $measure.Dispose()
    $measureBitmap.Dispose()
    foreach ($font in $fonts) { $font.Dispose() }
}
