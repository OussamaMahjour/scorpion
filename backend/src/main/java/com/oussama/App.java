package com.oussama;


import io.javalin.Javalin;
import okhttp3.Route;


public class App
{
    public static void main( String[] args )
    {
        Javalin app = Javalin.create(
                config -> {
                    config.bundledPlugins.enableCors(cors->{
                        cors.addRule(it ->{
                           it.anyHost();
                           it.allowHost("scorpion_frontend");
                        });
                    });
                }
        );
        Router router = new Router(app);
        router.init();
        router.start(8080);

    }
}
