class OrderItem {
  final int id;
  final int productId;
  final int quantity;
  final int? deliveredQuantity;
  final double unitPrice;
  final String productName;
  final String productUnit;
  final bool isBonification;

  OrderItem({
    required this.id,
    required this.productId,
    required this.quantity,
    this.deliveredQuantity,
    required this.unitPrice,
    required this.productName,
    required this.productUnit,
    this.isBonification = false,
  });

  /// Cantidad realmente entregada (si es null, se entregó todo)
  int get actualDelivered => deliveredQuantity ?? quantity;

  /// Cantidad devuelta (no vendida)
  int get returnedQuantity => quantity - actualDelivered;

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      id: (json['id'] as num? ?? 0).toInt(),
      productId: json['productId'] ?? json['product']?['id'] ?? 0,
      quantity: (json['quantity'] as num? ?? 0).toInt(),
      deliveredQuantity: json['deliveredQuantity'] != null
          ? (json['deliveredQuantity'] as num).toInt()
          : null,
      unitPrice: (json['unitPrice'] as num? ?? 0.0).toDouble(),
      productName: json['product']?['name'] ?? 'Producto Desconocido',
      productUnit: json['product']?['unit'] ?? 'ud',
      isBonification: json['isBonification'] == true,
    );
  }
}

class OrderClient {
  final int id;
  final String name;
  final String ownerName;
  final String phone;
  final String address;
  final double latitude;
  final double longitude;
  final String? photoUrl;

  OrderClient({
    required this.id,
    required this.name,
    required this.ownerName,
    required this.phone,
    required this.address,
    required this.latitude,
    required this.longitude,
    this.photoUrl,
  });

  factory OrderClient.fromJson(Map<String, dynamic> json) {
    return OrderClient(
      id: json['id'] ?? 0,
      name: json['name'] ?? 'Sin Nombre',
      ownerName: json['ownerName'] ?? '',
      phone: json['phone'] ?? '',
      address: json['address'] ?? 'Sin Dirección',
      latitude: (json['latitude'] as num? ?? 0.0).toDouble(),
      longitude: (json['longitude'] as num? ?? 0.0).toDouble(),
      photoUrl: json['photoUrl'] ?? json['photo_url'],
    );
  }
}

class Order {
  final int id;
  final String status;
  final String? notes;
  final double discount;
  final String createdAt;
  final String? preventistaName;
  final OrderClient client;
  final List<OrderItem> items;

  Order({
    required this.id,
    required this.status,
    this.notes,
    this.discount = 0.0,
    required this.createdAt,
    this.preventistaName,
    required this.client,
    required this.items,
  });

  /// Subtotal bruto antes de descuento (solo ítems regulares, excluye bonificaciones)
  double get subtotal =>
      items
          .where((item) => !item.isBonification)
          .fold(0.0, (sum, item) => sum + (item.unitPrice * item.quantity));

  /// Total neto a cobrar (después de descuento)
  double get total {
    final net = subtotal - discount;
    return net > 0 ? net : 0.0;
  }

  /// Subtotal bruto de lo realmente entregado (excluye bonificaciones)
  double get subtotalEntregado => items
      .where((item) => !item.isBonification)
      .fold(
        0.0,
        (sum, item) => sum + (item.unitPrice * item.actualDelivered),
      );

  /// Total neto cobrado en entrega (después de descuento)
  double get totalEntregado {
    final net = subtotalEntregado - discount;
    return net > 0 ? net : 0.0;
  }

  /// Si es entrega parcial
  bool get isPartial => status == 'entrega_parcial';

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: (json['id'] as num? ?? 0).toInt(),
      status: json['status']?.toString() ?? 'pendiente',
      notes: json['notes']?.toString(),
      discount: (json['discount'] as num? ?? 0.0).toDouble(),
      createdAt: json['createdAt']?.toString() ?? DateTime.now().toIso8601String(),
      preventistaName: json['preventista']?['name']?.toString(),
      client: json['client'] != null
          ? OrderClient.fromJson(json['client'] as Map<String, dynamic>)
          : OrderClient(
              id: 0,
              name: 'Sin cliente',
              ownerName: '',
              phone: '',
              address: '',
              latitude: 0,
              longitude: 0,
            ),
      items: json['items'] != null
          ? (json['items'] as List)
              .map((i) => OrderItem.fromJson(i as Map<String, dynamic>))
              .toList()
          : [],
    );
  }
}
