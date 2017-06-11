import { ProductType } from "./productType"
import { Product } from "./product"

export class BasketProduct 
{
	id: number;
	user_id: number;
	quantity: number;
    product_id: number;
	type_id: number;
	product_data: Product;
	type_data: ProductType;
}