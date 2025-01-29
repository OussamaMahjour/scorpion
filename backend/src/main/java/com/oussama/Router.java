package com.oussama;

import com.oussama.controller.Controller;
import io.javalin.Javalin;



public class Router {

    private final Javalin app;
    public Router(Javalin app){
        this.app = app;
    }

    public void init(){
       this.app.post("/validate", Controller::validate);
       this.app.post("/transform", Controller::transform);
    }
    public void start(int port){
        this.app.start(port);
    }
}
