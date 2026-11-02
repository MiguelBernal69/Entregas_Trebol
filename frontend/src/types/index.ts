export type Role = 'admin' | 'preventista' | 'distribuidor'

export interface User {
    id: number
    name: string
    email: string
    phone?: string
    role: Role
    isActive: boolean
    createdAt: string
}

export interface Product {
    id: number
    name: string
    description?: string
    price: number
    unit: string
    category: string
    isActive: boolean
}

export interface Region {
    id: number
    name: string
    color: string
    polygon?: any
    creatorName?: string
}

export interface Client {
    id: number
    name: string
    ownerName: string
    phone: string
    address: string
    latitude: number
    longitude: number
    photoUrl?: string
    regionId?: number
    region?: Region
    creator?: { id: number; name: string }
    isActive: boolean
}

export interface OrderItem {
    id: number
    productId: number
    quantity: number
    unitPrice: number
    deliveredQuantity?: number
    isBonification?: boolean
    product: Product
}

export type OrderStatus = 'pendiente' | 'aceptado' | 'asignado' | 'entregado' | 'entrega_parcial'

export interface Order {
    id: number
    clientId: number
    preventistaId: number
    distributorId?: number
    regionId?: number
    status: OrderStatus
    notes?: string
    discount?: number
    deliveredAt?: string
    createdAt: string
    client: Client
    preventista: { id: number; name: string }
    distributor?: { id: number; name: string }
    region?: Region
    items: OrderItem[]
}