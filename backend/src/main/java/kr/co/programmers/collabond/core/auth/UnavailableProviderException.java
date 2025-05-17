package kr.co.programmers.collabond.core.auth;

public class UnavailableProviderException extends RuntimeException {

    public UnavailableProviderException() {
        super();
    }

    public UnavailableProviderException(String message) {
        super(message);
    }

    public UnavailableProviderException(String message, Throwable cause) {
        super(message, cause);
    }

    public UnavailableProviderException(Throwable cause) {
        super(cause);
    }

}
