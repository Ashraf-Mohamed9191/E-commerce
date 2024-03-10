import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }





  addToCart(id:string):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart` , 
    {productId: id}
    )
  }


  getUserCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

  removeItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`)
  }
  
  updateCartProduct(idProduct:string , newCount:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${idProduct}`,
    {
      count: newCount
    }
    )
  }



  checkOut(id:string , userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200` ,
    {
      shippingAddress: userData
    }
    )
  }
}
