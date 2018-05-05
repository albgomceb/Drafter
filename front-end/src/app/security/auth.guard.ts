import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import { Observable } from "rxjs/Observable";
import { LoginService } from "../componentes/services/login.service";
import { User } from "../componentes/models/user.model";

@Injectable()
export class AuthGuard implements CanActivate {

    public user:User;

    constructor(private loginService:LoginService, public router: Router){
    //constructor(private router:Router, private loginService:LoginService) {

    }

    canActivate():boolean {


        if (this.loginService.getPrincipal() !=null) {
            console.log("logeado");
            
            return true;
        }
        else{
            console.log("no logueado");

            this.router.navigate(['login']);
            return false;
        }

    // canActivate(route:ActivatedRouteSnapshot,
    //             state:RouterStateSnapshot):Observable<boolean> {
    //     console.log('entro en canActivate');

        
    //     if (this.loginService.getPrincipal() !=null) {
    //         console.log("logeado");
            
    //         return Observable.of(true);
    //     }
    //     else{
    //         console.log("no logueado");

    //         this.router.navigate(['/login']);
    //         return Observable.of(false);
    //     }
        
        
        // .subscribe(isLogged =>{
        //         if(!isLogged) {
        //             console.log('not loggued');
                    
        //             this.router.navigate(['/login']);
        //             return Observable.of(false);
        //         }else{
        //             console.log('loggued');
        //             return Observable.of(true);
        //         }
        //     });
            // .take(1)
            // .do(allowed => {
                
            // });
            // return Observable.of(false);
    }

}