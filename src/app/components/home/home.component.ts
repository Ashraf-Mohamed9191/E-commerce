import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdatapService } from 'src/app/shared/services/ecomdatap.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private _EcomdatapService:EcomdatapService , private _CartService:CartService , private _ToastrService:ToastrService , private _WishlistService:WishlistService){}

  products:Product[] = [];

  categories:any[] = [];

  searchTerm:string = '';


  wishListIds:string[] = []; // to contains id s that is add to wishList



  addCart(productId:string):void{
    this._CartService.addToCart(productId).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message , 'Fresh Cart');
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }



  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    autoplay: true,
    autoplaySpeed: 300,
    items: 1,
    nav: false
  }




  categoriesSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    autoplay: true,
    autoplaySpeed: 300,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }



  ngOnInit(): void {
    // Get All Product 
      this._EcomdatapService.getAllProducts().subscribe({
        next:(response)=>{
          this.products = response.data;
        }
      })




    // Get Categories 
      this._EcomdatapService.getCategories().subscribe({
        next:(response)=>{
          this.categories = response.data;
          // console.log(response.data);
          
        }
      })
      
      // get wishList products id
      this._WishlistService.getWishListProduct().subscribe({
        next:(response)=>{
          const newData = response.data.map((item:any)=>item._id );

          this.wishListIds = newData;
        }
      })

  }


  addProdToWishList(productId:string):void{
    this._WishlistService.addToWishList(productId).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message)
        this.wishListIds = response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
