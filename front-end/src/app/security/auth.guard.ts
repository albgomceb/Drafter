import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import { Observable } from "rxjs/Observable";
import { LoginService } from "../componentes/services/login.service";
import { User } from "../componentes/models/user.model";

@Injectable()
export class AuthGuard implements CanActivate {

    public user:User;

    constructor(private loginService:LoginService, public router: Router) { }

    canActivate():boolean {
        this.loginService.syncInit();

        if (this.loginService.isAuthenticated()) {
            return true;
        } else { 
            this.router.navigate(['login'])
            return false;
        }
    }

}
