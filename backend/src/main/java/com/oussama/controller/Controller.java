package com.oussama.controller;

import com.oussama.service.Service;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import io.javalin.http.UploadedFile;
import org.eclipse.jetty.http.HttpTester;
import org.jetbrains.annotations.NotNull;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class Controller  {

    public static void validate(@NotNull Context ctx) {
        UploadedFile uploadedFile = ctx.uploadedFile("file");
        if (uploadedFile == null) {
            ctx.result("No file uploaded").status(400);
            return;
        }
        InputStream inputStream = uploadedFile.content();
        try {
            byte[] buffer = inputStream.readAllBytes();
            String content = new String(buffer);
            ctx.result(content);
            String response = Service.validate(content);
            if(response.equals(Service.XML_VALID)){
                ctx.result(Service.XML_VALID).status(200);
            }else{
                ctx.result(response).status(400);
            }

        } catch (Exception e) {
            e.printStackTrace();
            ctx.result("error loading file").status(500);
        }




    }
    public static void transform(Context ctx){
        UploadedFile uploadedFile = ctx.uploadedFile("file");
        if (uploadedFile == null) {
            ctx.result("No file uploaded").status(400);
            return;
        }
        InputStream inputStream = uploadedFile.content();
        try {
            byte[] buffer =inputStream.readAllBytes();
            String content = new String(buffer);
            ctx.result(content);
            String pythonScript = Service.compileXMLToPython(content);
            InputStream inputStream1 = new ByteArrayInputStream(pythonScript.getBytes(StandardCharsets.UTF_8));
            ctx.contentType("file").result(inputStream1);

        } catch (Exception e) {
            e.printStackTrace();
            ctx.result("error loading file");
        }
    }



}
