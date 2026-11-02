class Client {
  final int id;
  final String name;
  final String ownerName;
  final String phone;
  final String address;
  final double latitude;
  final double longitude;
  final String? photoUrl;
  final bool isActive;

  Client({
    required this.id,
    required this.name,
    required this.ownerName,
    required this.phone,
    required this.address,
    required this.latitude,
    required this.longitude,
    this.photoUrl,
    required this.isActive,
  });

  factory Client.fromJson(Map<String, dynamic> json) {
    return Client(
      id: json['id'],
      name: json['name'],
      ownerName: json['ownerName'],
      phone: json['phone'],
      address: json['address'],
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
      photoUrl: json['photoUrl'],
      isActive: json['isActive'] ?? true,
    );
  }
}
