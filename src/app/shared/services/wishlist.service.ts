import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }


  addToWishList(id:string):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , 
    {
      productId: id
    }
    )
  }


  getWishListProduct():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)
  }


  removeProductFromWishList(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`)
  }
}
