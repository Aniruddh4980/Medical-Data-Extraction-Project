import cv2
import numpy as np

def preprocess_image(img):
    # Convert PIL Image to grayscale
    gray = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2GRAY)

    # Remove small noise while preserving text edges
    gray = cv2.medianBlur(gray, 3)

    # Upscale image for better OCR
    gray = cv2.resize(
        gray,
        None,
        fx=2.5,
        fy=2.5,
        interpolation=cv2.INTER_CUBIC
    )

    # Adaptive thresholding
    thresh = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        61,
        11
    )

    # Remove tiny dots/noise
    kernel = np.ones((2, 2), np.uint8)
    thresh = cv2.morphologyEx(
        thresh,
        cv2.MORPH_OPEN,
        kernel
    )

    return thresh