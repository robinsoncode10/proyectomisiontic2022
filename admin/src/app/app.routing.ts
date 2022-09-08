import { Routes, RouterModule } from "@angular/router"
import { ModuleWithProviders} from "@angular/core"
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";


//Aqui creamos las rutas.
const appRoute : Routes = [
    {path: '',component: InicioComponent},
    {path: 'login',component: LoginComponent}
]

export const appRoutingPorviders : any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
