package tech.getarrays.employeemanager.exception;

public class UserNotFindException extends RuntimeException{
    public UserNotFindException(String message) {
        super(message);
    }
}
