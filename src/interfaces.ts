export interface ProductOrder{
    productId: string;
    quantity_total: number;
    quantity_stock: number;
    quantiy_preorder: number;
    size: string;
    sizeId: string;
    name_fr: string;
    name_en: string;
    itemId: string;
    price: number;
    description: string;
}

export interface Order {
    id: string;
    userId: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userPhone: string;
    orderDate: Date;
    orderStatus: string;
    price: number;
    products: ProductOrder[];
}

export interface ProductOrderPatch{
    productId: string;
    quantity_total: number;
    quantity_stock?: number;
    quantiy_preorder?: number;
    size?: string;
    sizeId?: string;
    name_fr?: string;
    name_en?: string;
    itemId?: string;
    price?: number;
    description?: string;
}

export interface OrderPatch {
    id?: string;
    userId?: string;
    userFirstName?: string;
    userLastName?: string;
    userEmail?: string;
    userPhone?: string;
    orderDate?: Date;
    orderStatus?: string;
    price?: number;
    products?: ProductOrderPatch[];
}

export interface ProductOrderPost{
    productId: string;
    quantity_total: number;
    quantity_stock?: number;
    quantiy_preorder?: number;
    size?: string;
    sizeId?: string;
    name_fr?: string;
    name_en?: string;
    itemId?: string;
    price?: number;
    description?: string;
}

export interface OrderPost {
    id?: string;
    userId: string;
    userFirstName?: string;
    userLastName?: string;
    userEmail?: string;
    userPhone?: string;
    orderDate?: Date;
    orderStatus?: string;
    price?: number;
    products: ProductOrderPatch[];
}

export interface Product {
    id: string;
    itemId: string;
    title_fr: string;
    title_en: string;
    sizeId: string;
    size: string;
    stock: number;
    preorder: number;
    description_fr: string;
    description_en: string;
    price: number;
    image: string;
}

export interface ProductItem {
    id: string;
    sizeId: string;
    size: string;
    stock: number;
    preorder: number;
}

export interface Item {
    id: string;
    title_fr: string;
    title_en: string;
    description_fr: string;
    description_en: string;
    price: number;
    image: string;
    products: ProductItem[]
}

export interface ProductItemPatch {
    id: string;
    sizeId?: string;
    size?: string;
    stock: number;
    preorder?: number;
}

export interface ItemPatch {
    id?: string;
    title_fr?: string;
    title_en?: string;
    description_fr?: string;
    description_en?: string;
    price?: number;
    image?: string;
    products: ProductItemPatch[]
}