package org.stockitem.config;
import java.util.List;

public class CustomErrorType {


    private String errorMessage;

    public CustomErrorType(String errorMessage){
        this.errorMessage = errorMessage;
    }

    public CustomErrorType(List<String> errorMessage){
        this.errorMessage = errorMessage.toString();
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    int num = -1;


}
