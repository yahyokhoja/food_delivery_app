export interface FoodItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
}

export interface Order {
    orderId: number;
    items: FoodItem[];
    totalAmount: number;
    customerName: string;
    deliveryAddress: string;
    orderDate: Date;
}

export interface Меню {
    id: number;
    название: string;
    цена: number;
}