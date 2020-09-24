import { Product } from './product';
export class CartItem {
    id: string;
    name: string;
    image : string;
    unitPrice: number;
    quantity: number;

    constructor(product: Product){
        this.id = product.id;
        this.name=product.name;
        this.image=product.image;
        this.unitPrice=product.unitPrice;
        this.quantity=1;

    }
}
