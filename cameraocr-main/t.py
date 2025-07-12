import cv2
import numpy as np
import matplotlib.pyplot as plt
from ultralytics import YOLO
import os
import glob

# === CONFIGURATION ===
tflite_model_path = 'anpr2_yolov9_int8.tflite'
image_folder = '/Users/ishitkaroli/Downloads/license-plates'
output_folder = image_folder  # Save results in the same folder

# === STEP 1: Load up to 3 JPEG images ===
image_paths = glob.glob(os.path.join(image_folder, '*.jpeg'))
image_paths = sorted(image_paths)[:3]

if not image_paths:
    raise FileNotFoundError(f'No .jpeg images found in {image_folder}')

# === STEP 2: Load YOLOv9 TFLite model ===
model = YOLO(tflite_model_path)

# === STEP 3: Process each image ===
for sample_image_path in image_paths:
    print(f"Processing: {sample_image_path}")

    # Run inference
    results = model.predict(sample_image_path, imgsz=640, conf=0.5, int8=True)

    # Load and prepare image
    img = cv2.imread(sample_image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Draw bounding boxes
    for result in results:
        boxes = result.boxes.xyxy.cpu().numpy()
        scores = result.boxes.conf.cpu().numpy()
        for box, score in zip(boxes, scores):
            x1, y1, x2, y2 = map(int, box)
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(img, f'Plate {score:.2f}', (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    # Display
    plt.figure(figsize=(10, 10))
    plt.imshow(img)
    plt.axis('off')
    plt.title(f'Detection: {os.path.basename(sample_image_path)}')
    plt.show()

    # Save result
    output_path = os.path.join(
        output_folder, f"annotated_{os.path.basename(sample_image_path)}")
    cv2.imwrite(output_path, cv2.cvtColor(img, cv2.COLOR_RGB2BGR))
    print(f"✅ Saved: {output_path}\n")
