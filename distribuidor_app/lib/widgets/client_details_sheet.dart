import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../config/api.dart';
import '../services/client_service.dart';

class ClientDetailsSheet {
  static void show(
    BuildContext context, {
    required int id, // Añadido ID
    required String name,
    required String ownerName,
    required String phone,
    required String address,
    required double latitude,
    required double longitude,
    String? photoUrl,
    VoidCallback? onUpdate,
    VoidCallback? onCreateOrder,
    bool isVisited = false,
    bool visitedWithOrder = false,
    VoidCallback? onMarkNoOrder,
    VoidCallback? onUnmarkNoOrder,
  }) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => _ClientDetailsSheetWidget(
        id: id,
        name: name,
        ownerName: ownerName,
        phone: phone,
        address: address,
        latitude: latitude,
        longitude: longitude,
        photoUrl: photoUrl,
        onUpdate: onUpdate,
        onCreateOrder: onCreateOrder,
        isVisited: isVisited,
        visitedWithOrder: visitedWithOrder,
        onMarkNoOrder: onMarkNoOrder,
        onUnmarkNoOrder: onUnmarkNoOrder,
      ),
    );
  }
}

class _ClientDetailsSheetWidget extends StatefulWidget {
  final int id;
  final String name;
  final String ownerName;
  final String phone;
  final String address;
  final double latitude;
  final double longitude;
  final String? photoUrl;
  final VoidCallback? onUpdate;
  final VoidCallback? onCreateOrder;
  final bool isVisited;
  final bool visitedWithOrder;
  final VoidCallback? onMarkNoOrder;
  final VoidCallback? onUnmarkNoOrder;

  const _ClientDetailsSheetWidget({
    required this.id,
    required this.name,
    required this.ownerName,
    required this.phone,
    required this.address,
    required this.latitude,
    required this.longitude,
    this.photoUrl,
    this.onUpdate,
    this.onCreateOrder,
    this.isVisited = false,
    this.visitedWithOrder = false,
    this.onMarkNoOrder,
    this.onUnmarkNoOrder,
  });

  @override
  State<_ClientDetailsSheetWidget> createState() => _ClientDetailsSheetWidgetState();
}

class _ClientDetailsSheetWidgetState extends State<_ClientDetailsSheetWidget> {
  late TextEditingController _nameCtrl;
  late TextEditingController _ownerCtrl;
  late TextEditingController _phoneCtrl;
  late TextEditingController _addressCtrl;

  File? _selectedImage;
  bool _isEditing = false;
  bool _isSaving = false;

  @override
  void initState() {
    super.initState();
    _nameCtrl = TextEditingController(text: widget.name);
    _ownerCtrl = TextEditingController(text: widget.ownerName);
    _phoneCtrl = TextEditingController(text: widget.phone);
    _addressCtrl = TextEditingController(text: widget.address);
  }

  @override
  void dispose() {
    _nameCtrl.dispose();
    _ownerCtrl.dispose();
    _phoneCtrl.dispose();
    _addressCtrl.dispose();
    super.dispose();
  }

  Future<void> _pickImage(ImageSource source) async {
    try {
      final picker = ImagePicker();
      final pickedFile = await picker.pickImage(
        source: source,
        imageQuality: 70,
        maxWidth: 1000,
      );

      if (pickedFile != null) {
        setState(() {
          _selectedImage = File(pickedFile.path);
        });
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error al acceder a la cámara: $e')),
        );
      }
    }
  }

  Future<void> _saveChanges() async {
    setState(() => _isSaving = true);
    try {
      await ClientService.updateClient(
        id: widget.id,
        name: _nameCtrl.text.trim(),
        ownerName: _ownerCtrl.text.trim(),
        phone: _phoneCtrl.text.trim(),
        address: _addressCtrl.text.trim(),
        latitude: widget.latitude,
        longitude: widget.longitude,
        imageFile: _selectedImage,
      );

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('✅ Cliente actualizado correctamente'), backgroundColor: Colors.green),
        );
        widget.onUpdate?.call();
        Navigator.pop(context);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('❌ Error: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _isSaving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.85,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          _buildHandle(),
          _buildHeader(),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildImageSection(),
                  const SizedBox(height: 16),
                  if (_isEditing)
                    _buildFormFields()
                  else
                    _buildClientInfoCard(),
                  const SizedBox(height: 20),
                  if (_isEditing || _selectedImage != null)
                    _buildSaveButton()
                  else
                    _buildActionButtons(),
                  const SizedBox(height: 16),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActionButtons() {
    // Si ya visitado CON pedido hoy
    if (widget.visitedWithOrder) {
      return SizedBox(
        width: double.infinity,
        child: ElevatedButton.icon(
          onPressed: () {
            Navigator.pop(context);
            widget.onCreateOrder?.call();
          },
          icon: const Icon(Icons.add_shopping_cart, size: 20),
          label: const Text(
            'Hacer otro pedido',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
          ),
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF10B981),
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(vertical: 14),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            elevation: 1,
          ),
        ),
      );
    }

    // Si ya fue marcado como "No compró" (visitado sin pedido)
    if (widget.isVisited && !widget.visitedWithOrder) {
      return Row(
        children: [
          if (widget.onUnmarkNoOrder != null)
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () {
                  Navigator.pop(context);
                  widget.onUnmarkNoOrder?.call();
                },
                icon: const Icon(Icons.undo_rounded, size: 18, color: Color(0xFF64748B)),
                label: const Text(
                  'Desmarcar',
                  style: TextStyle(
                    color: Color(0xFF64748B),
                    fontWeight: FontWeight.w600,
                    fontSize: 13,
                  ),
                ),
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: Color(0xFFCBD5E1)),
                  backgroundColor: const Color(0xFFF1F5F9),
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
            ),
          if (widget.onUnmarkNoOrder != null && widget.onCreateOrder != null)
            const SizedBox(width: 10),
          if (widget.onCreateOrder != null)
            Expanded(
              child: ElevatedButton.icon(
                onPressed: () {
                  Navigator.pop(context);
                  widget.onCreateOrder?.call();
                },
                icon: const Icon(Icons.shopping_cart_checkout, size: 19),
                label: const Text(
                  'Hacer Preventa',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF10B981),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  elevation: 1,
                ),
              ),
            ),
        ],
      );
    }

    // Cliente pendiente (aún no visitado) -> BOTONES LADO A LADO
    return Row(
      children: [
        if (widget.onMarkNoOrder != null)
          Expanded(
            flex: 5,
            child: OutlinedButton.icon(
              onPressed: () {
                Navigator.pop(context);
                widget.onMarkNoOrder?.call();
              },
              icon: const Icon(
                Icons.storefront_outlined,
                color: Color(0xFFD97706),
                size: 18,
              ),
              label: const Text(
                'No compró',
                style: TextStyle(
                  color: Color(0xFFD97706),
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
              style: OutlinedButton.styleFrom(
                side: const BorderSide(color: Color(0xFFF59E0B), width: 1.5),
                backgroundColor: const Color(0xFFFFFBEB),
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
          ),
        if (widget.onMarkNoOrder != null && widget.onCreateOrder != null)
          const SizedBox(width: 10),
        if (widget.onCreateOrder != null)
          Expanded(
            flex: 6,
            child: ElevatedButton.icon(
              onPressed: () {
                Navigator.pop(context);
                widget.onCreateOrder?.call();
              },
              icon: const Icon(Icons.shopping_cart_checkout, size: 19),
              label: const Text(
                'Hacer Preventa',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF10B981),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                elevation: 2,
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildClientInfoCard() {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Nombre del Negocio
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: const Color(0xFFEFF6FF),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.storefront_rounded, color: Color(0xFF2563EB), size: 22),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Nombre del Negocio',
                      style: TextStyle(
                        fontSize: 11,
                        color: Color(0xFF64748B),
                        fontWeight: FontWeight.w600,
                        letterSpacing: 0.3,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      _nameCtrl.text.isNotEmpty ? _nameCtrl.text : 'Sin nombre',
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF0F172A),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 12),
            child: Divider(height: 1, color: Color(0xFFE2E8F0)),
          ),
          // Encargado
          _buildInfoRow(
            icon: Icons.person_outline_rounded,
            iconColor: const Color(0xFF0284C7),
            iconBg: const Color(0xFFF0F9FF),
            label: 'Encargado',
            value: _ownerCtrl.text.isNotEmpty ? _ownerCtrl.text : 'No especificado',
          ),
          const SizedBox(height: 12),
          // Teléfono
          _buildInfoRow(
            icon: Icons.phone_outlined,
            iconColor: const Color(0xFF16A34A),
            iconBg: const Color(0xFFF0FDF4),
            label: 'Teléfono',
            value: _phoneCtrl.text.isNotEmpty ? _phoneCtrl.text : 'Sin teléfono',
            isPhone: _phoneCtrl.text.isNotEmpty,
          ),
          const SizedBox(height: 12),
          // Dirección
          _buildInfoRow(
            icon: Icons.location_on_outlined,
            iconColor: const Color(0xFFEA580C),
            iconBg: const Color(0xFFFFF7ED),
            label: 'Dirección',
            value: _addressCtrl.text.isNotEmpty ? _addressCtrl.text : 'Sin dirección',
          ),
        ],
      ),
    );
  }

  Widget _buildInfoRow({
    required IconData icon,
    required Color iconColor,
    required Color iconBg,
    required String label,
    required String value,
    bool isPhone = false,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.all(6),
          decoration: BoxDecoration(
            color: iconBg,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: iconColor, size: 16),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: const TextStyle(
                  fontSize: 11,
                  color: Color(0xFF64748B),
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: isPhone ? const Color(0xFF16A34A) : const Color(0xFF1E293B),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildHandle() {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 12),
      width: 40,
      height: 4,
      decoration: BoxDecoration(
        color: Colors.grey.shade300,
        borderRadius: BorderRadius.circular(2),
      ),
    );
  }

  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Row(
        children: [
          Text(
            _isEditing ? 'Editando Perfil' : 'Perfil del Cliente',
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          if (widget.isVisited) ...[
            const SizedBox(width: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: widget.visitedWithOrder
                    ? const Color(0xFFDCFCE7)
                    : const Color(0xFFFEF3C7),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: widget.visitedWithOrder
                      ? const Color(0xFF16A34A)
                      : const Color(0xFFD97706),
                ),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    widget.visitedWithOrder
                        ? Icons.check_circle
                        : Icons.storefront,
                    size: 13,
                    color: widget.visitedWithOrder
                        ? const Color(0xFF16A34A)
                        : const Color(0xFFD97706),
                  ),
                  const SizedBox(width: 4),
                  Text(
                    widget.visitedWithOrder ? 'Con Pedido' : 'Sin Compra',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: widget.visitedWithOrder
                          ? const Color(0xFF16A34A)
                          : const Color(0xFFD97706),
                    ),
                  ),
                ],
              ),
            ),
          ],
          const Spacer(),
          IconButton(
            icon: Icon(_isEditing ? Icons.close : Icons.edit, color: Colors.blue),
            onPressed: () => setState(() => _isEditing = !_isEditing),
          ),
          IconButton(
            icon: const Icon(Icons.close),
            onPressed: () => Navigator.pop(context),
          ),
        ],
      ),
    );
  }

  Widget _buildImageSection() {
    return Center(
      child: Stack(
        children: [
          Container(
            height: 150,
            width: double.infinity,
            decoration: BoxDecoration(
              color: Colors.grey.shade100,
              borderRadius: BorderRadius.circular(16),
              boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 6)],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(20),
              child: _selectedImage != null
                  ? Image.file(_selectedImage!, fit: BoxFit.cover)
                  : (widget.photoUrl != null && widget.photoUrl!.isNotEmpty)
                      ? Image.network(
                          Api.getImageUrl(widget.photoUrl!),
                          fit: BoxFit.cover,
                          errorBuilder: (_, _, _) => const Icon(Icons.store, size: 64, color: Colors.grey),
                        )
                      : const Icon(Icons.store, size: 64, color: Colors.grey),
            ),
          ),
          Positioned(
            bottom: 12,
            right: 12,
            child: FloatingActionButton.small(
              backgroundColor: const Color(0xFF3B82F6),
              onPressed: () => _showPickerOptions(),
              child: const Icon(Icons.camera_alt, color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }

  void _showPickerOptions() {
    showModalBottomSheet(
      context: context,
      builder: (_) => SafeArea(
        child: Wrap(
          children: [
            ListTile(
              leading: const Icon(Icons.camera_alt),
              title: const Text('Cámara'),
              onTap: () {
                Navigator.pop(context);
                _pickImage(ImageSource.camera);
              },
            ),
            ListTile(
              leading: const Icon(Icons.photo_library),
              title: const Text('Galería'),
              onTap: () {
                Navigator.pop(context);
                _pickImage(ImageSource.gallery);
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFormFields() {
    return Column(
      children: [
        _buildTextField(_nameCtrl, 'Nombre del Negocio', Icons.store, enabled: _isEditing),
        const SizedBox(height: 16),
        _buildTextField(_ownerCtrl, 'Encargado', Icons.person, enabled: _isEditing),
        const SizedBox(height: 16),
        _buildTextField(_phoneCtrl, 'Teléfono', Icons.phone, enabled: _isEditing, keyboardType: TextInputType.phone),
        const SizedBox(height: 16),
        _buildTextField(_addressCtrl, 'Dirección', Icons.location_on, enabled: _isEditing, maxLines: 2),
      ],
    );
  }

  Widget _buildTextField(
    TextEditingController controller,
    String label,
    IconData icon, {
    bool enabled = true,
    TextInputType keyboardType = TextInputType.text,
    int maxLines = 1,
  }) {
    return TextField(
      controller: controller,
      enabled: enabled && !_isSaving,
      keyboardType: keyboardType,
      maxLines: maxLines,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon, size: 20),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        filled: !enabled,
        fillColor: enabled ? Colors.transparent : Colors.grey.shade50,
      ),
      style: const TextStyle(fontSize: 14),
      onChanged: (_) => setState(() {}), // Activa el botón de guardar
    );
  }

  Widget _buildSaveButton() {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: _isSaving ? null : _saveChanges,
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF10B981),
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(vertical: 16),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          elevation: 0,
        ),
        child: _isSaving
            ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
            : const Text('Guardar Cambios', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
    );
  }
}
