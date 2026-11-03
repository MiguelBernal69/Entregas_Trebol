param([Parameter(Mandatory = $true)][string]$PrinterName)
$ErrorActionPreference = 'Stop'

Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;

public static class RawPrinter {
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    public struct DocInfo {
        [MarshalAs(UnmanagedType.LPWStr)] public string Name;
        [MarshalAs(UnmanagedType.LPWStr)] public string OutputFile;
        [MarshalAs(UnmanagedType.LPWStr)] public string DataType;
    }

    [DllImport("winspool.drv", EntryPoint = "OpenPrinterW", CharSet = CharSet.Unicode, SetLastError = true)]
    static extern bool OpenPrinter(string name, out IntPtr handle, IntPtr defaults);
    [DllImport("winspool.drv", EntryPoint = "ClosePrinter", SetLastError = true)]
    static extern bool ClosePrinter(IntPtr handle);
    [DllImport("winspool.drv", EntryPoint = "StartDocPrinterW", CharSet = CharSet.Unicode, SetLastError = true)]
    static extern uint StartDocPrinter(IntPtr handle, int level, ref DocInfo info);
    [DllImport("winspool.drv", EntryPoint = "EndDocPrinter", SetLastError = true)]
    static extern bool EndDocPrinter(IntPtr handle);
    [DllImport("winspool.drv", EntryPoint = "StartPagePrinter", SetLastError = true)]
    static extern bool StartPagePrinter(IntPtr handle);
    [DllImport("winspool.drv", EntryPoint = "EndPagePrinter", SetLastError = true)]
    static extern bool EndPagePrinter(IntPtr handle);
    [DllImport("winspool.drv", EntryPoint = "WritePrinter", SetLastError = true)]
    static extern bool WritePrinter(IntPtr handle, IntPtr buffer, int count, out int written);

    public static void Send(string printerName, byte[] data) {
        IntPtr handle;
        if (!OpenPrinter(printerName, out handle, IntPtr.Zero))
            throw new System.ComponentModel.Win32Exception(Marshal.GetLastWin32Error(), "No se pudo abrir la impresora " + printerName);
        try {
            var info = new DocInfo { Name = "Boleta Distribuidora Trebol", DataType = "RAW" };
            if (StartDocPrinter(handle, 1, ref info) == 0)
                throw new System.ComponentModel.Win32Exception(Marshal.GetLastWin32Error(), "No se pudo iniciar el trabajo RAW");
            try {
                if (!StartPagePrinter(handle)) throw new System.ComponentModel.Win32Exception(Marshal.GetLastWin32Error());
                try {
                    IntPtr buffer = Marshal.AllocHGlobal(data.Length);
                    try {
                        Marshal.Copy(data, 0, buffer, data.Length);
                        int written;
                        if (!WritePrinter(handle, buffer, data.Length, out written) || written != data.Length)
                            throw new System.ComponentModel.Win32Exception(Marshal.GetLastWin32Error(), "No se pudo enviar toda la boleta");
                    } finally { Marshal.FreeHGlobal(buffer); }
                } finally { EndPagePrinter(handle); }
            } finally { EndDocPrinter(handle); }
        } finally { ClosePrinter(handle); }
    }
}
'@

$base64 = [Console]::In.ReadToEnd().Trim()
if (-not $base64) { throw 'La boleta está vacía' }
[RawPrinter]::Send($PrinterName, [Convert]::FromBase64String($base64))
