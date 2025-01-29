package com.oussama.service;

import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;

public class Service {

    public  static boolean validate(String xml) throws SAXException {
        try {
            // Load XSD
            SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Source schemaSource = new StreamSource(new File("pipeline.xsd"));
            Schema schema = factory.newSchema(schemaSource);

            // Create validator
            Validator validator = schema.newValidator();

            // XML string to validate
            Source xmlSource = new StreamSource(new StringReader(xml));

            // Validate
            validator.validate(xmlSource);
            return true;
        } catch (SAXException e) {
            return false;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;

    }
    public static String compileXMLToPython(String xmlStr){
        try {
            String xsltPath = "pipeline.xslt";

            // Load XML and XSLT
            Source xmlSource = new StreamSource(new StringReader(xmlStr));
            Source xsltSource = new StreamSource(xsltPath);

            // Configure transformer
            TransformerFactory factory = TransformerFactory.newInstance();
            Transformer transformer = factory.newTransformer(xsltSource);

            // Capture the transformed output
            StringWriter writer = new StringWriter();
            StreamResult result = new StreamResult(writer);

            // Perform the transformation
            transformer.transform(xmlSource, result);

            // Output the generated Python script
            String pythonScript = writer.toString();
            return pythonScript;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "coudn't transform xml to python";
    }
}
