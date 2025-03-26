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

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    isAdmin: boolean;
}

export interface Membre {
    id: string
    first_name: string
    last_name: string
    role_fr: string
    role_en: string
    image:string
    poles:PoleMembre[]
}

export interface PoleMembre{
    id:string
    name_fr:string
    name_en:string
    description_fr?:string
    description_en?:string
    respo:boolean
    show:boolean
}

export interface Pole{
    id:string
    name_fr:string
    name_en:string
    description_fr?:string
    description_en?:string
    show:boolean
    membres: MembrePole[]
}

export interface MembrePole {
    id: string
    first_name: string
    last_name: string
    role_fr: string
    role_en: string
    respo: boolean
    image:string
}

export interface PolePatch{
    id?:string
    name_fr?:string
    name_en?:string
    description_fr?:string
    description_en?:string
    show?:boolean
    membres?: MembrePole[]
}

export interface MembrePolePatch {
    id?: string
    first_name?: string
    last_name?: string
    role_fr?: string
    role_en?: string
    respo?: boolean
}

export interface NewUser {
    id? : string
    first_name:string
    last_name:string
    email?:string
    phone:string
    isAdmin:boolean
}

export interface UserPatch {
    id? : string
    first_name?:string
    last_name?:string
    email?:string
    phone?:string
    isAdmin?:boolean
}