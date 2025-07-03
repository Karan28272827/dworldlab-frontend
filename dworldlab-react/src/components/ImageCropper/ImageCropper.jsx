import React, { useState, useRef, useEffect, useCallback } from "react";
import "./ImageCropper.css";

function ImageCropper() {
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImageSrc, setCroppedImageSrc] = useState(null);
  const [originalImage, setOriginalImage] = useState(null); // Stores the Image object
  const [message, setMessage] = useState("");

  // State for cropping interaction
  const [isDrawing, setIsDrawing] = useState(false); // True when drawing a *new* selection
  const [isResizing, setIsResizing] = useState(false); // True when resizing an existing selection
  const [resizeHandle, setResizeHandle] = useState(null); // Which handle is being dragged (e.g., 'nw', 'n', 'e')
  const [isMoving, setIsMoving] = useState(false); // True when moving an existing selection
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 }); // Mouse position when interaction starts
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Offset for moving the cropRect

  // Crop rectangle dimensions relative to the displayed image
  const [cropRect, setCropRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const canvasRef = useRef(null);
  const imageRef = useRef(null); // Reference to the displayed image element

  // Clean up object URLs when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
      if (croppedImageSrc) URL.revokeObjectURL(croppedImageSrc);
    };
  }, [imageSrc, croppedImageSrc]);

  /**
   * Handles image file selection.
   * Reads the file and sets the image source for display.
   * @param {Event} e - The change event from the file input.
   */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setMessage(
        "Image loaded. Drag to select crop area, or click/drag existing selection to move/resize.",
      );
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setOriginalImage(img);
          setImageSrc(event.target.result);
          setCroppedImageSrc(null); // Clear previous cropped image
          setCropRect({ x: 0, y: 0, width: 0, height: 0 }); // Reset crop area
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc(null);
      setOriginalImage(null);
      setCroppedImageSrc(null);
      setMessage("Please select a valid image file (e.g., JPG, PNG).");
    }
  };

  /**
   * Clamps a value within a given min and max.
   * @param {number} value - The value to clamp.
   * @param {number} min - The minimum allowed value.
   * @param {number} max - The maximum allowed value.
   * @returns {number} The clamped value.
   */
  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  /**
   * Gets the mouse coordinates relative to the image container.
   * @param {MouseEvent} e - The mouse event.
   * @returns {{x: number, y: number}} Relative coordinates.
   */
  const getMouseCoords = (e) => {
    const imageElement = imageRef.current;
    if (!imageElement) return { x: 0, y: 0 };
    const rect = imageElement.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  /**
   * Handles mouse down event on the image container or resize handles.
   * Determines if a new selection is being drawn, or an existing one is being moved/resized.
   * @param {MouseEvent} e - The mouse down event.
   */
  const handleMouseDown = useCallback(
    (e) => {
      if (!imageSrc) return;
      setCroppedImageSrc(null); // Clear previous cropped image on new interaction

      const mouseCoords = getMouseCoords(e);
      const { x, y } = mouseCoords;

      // Check if clicking on a resize handle
      const handleName = e.target.dataset.handle;
      if (handleName) {
        setIsResizing(true);
        setResizeHandle(handleName);
        setStartPoint(mouseCoords); // Store mouse start for resize calculation
        setMessage(`Resizing from ${handleName} handle.`);
        return;
      }

      // Check if clicking inside the existing cropRect to move it
      if (
        cropRect.width > 0 &&
        cropRect.height > 0 &&
        x >= cropRect.x &&
        x <= cropRect.x + cropRect.width &&
        y >= cropRect.y &&
        y <= cropRect.y + cropRect.height
      ) {
        setIsMoving(true);
        setOffset({ x: x - cropRect.x, y: y - cropRect.y }); // Offset from top-left of cropRect
        setMessage("Moving selection.");
        return;
      }

      // Otherwise, start drawing a new selection
      setIsDrawing(true);
      setStartPoint(mouseCoords);
      setCropRect({ x, y, width: 0, height: 0 });
      setMessage("Drawing new selection.");
    },
    [imageSrc, cropRect],
  ); // Depend on cropRect to accurately check if clicking inside it

  /**
   * Handles mouse move event to draw, resize, or move the crop rectangle.
   * @param {MouseEvent} e - The mouse move event.
   */
  const handleMouseMove = useCallback(
    (e) => {
      if (!imageSrc) return;

      const imageElement = imageRef.current;
      if (!imageElement) return; // Ensure imageElement is available
      const { offsetWidth: imgW, offsetHeight: imgH } = imageElement;

      const mouseCoords = getMouseCoords(e);
      let currentX = clamp(mouseCoords.x, 0, imgW);
      let currentY = clamp(mouseCoords.y, 0, imgH);

      setCropRect((prevRect) => {
        let newRect = { ...prevRect };

        if (isDrawing) {
          // Drawing a new rectangle
          newRect.x = Math.min(startPoint.x, currentX);
          newRect.y = Math.min(startPoint.y, currentY);
          newRect.width = Math.abs(currentX - startPoint.x);
          newRect.height = Math.abs(currentY - startPoint.y);
        } else if (isResizing && resizeHandle) {
          // Resizing an existing rectangle
          let { x, y, width, height } = prevRect;

          switch (resizeHandle) {
            case "nw":
              newRect.width = clamp(width + (x - currentX), 0, imgW);
              newRect.height = clamp(height + (y - currentY), 0, imgH);
              newRect.x = clamp(currentX, 0, x + width);
              newRect.y = clamp(currentY, 0, y + height);
              break;
            case "n":
              newRect.height = clamp(height + (y - currentY), 0, imgH);
              newRect.y = clamp(currentY, 0, y + height);
              break;
            case "ne":
              newRect.width = clamp(currentX - x, 0, imgW - x);
              newRect.height = clamp(height + (y - currentY), 0, imgH);
              newRect.y = clamp(currentY, 0, y + height);
              break;
            case "e":
              newRect.width = clamp(currentX - x, 0, imgW - x);
              break;
            case "se":
              newRect.width = clamp(currentX - x, 0, imgW - x);
              newRect.height = clamp(currentY - y, 0, imgH - y);
              break;
            case "s":
              newRect.height = clamp(currentY - y, 0, imgH - y);
              break;
            case "sw":
              newRect.width = clamp(width + (x - currentX), 0, imgW);
              newRect.height = clamp(currentY - y, 0, imgH - y);
              newRect.x = clamp(currentX, 0, x + width);
              break;
            case "w":
              newRect.width = clamp(width + (x - currentX), 0, imgW);
              newRect.x = clamp(currentX, 0, x + width);
              break;
            default:
              break;
          }

          // Ensure width/height don't become negative due to clamping issues
          newRect.width = Math.max(0, newRect.width);
          newRect.height = Math.max(0, newRect.height);
        } else if (isMoving) {
          // Moving an existing rectangle
          newRect.x = clamp(currentX - offset.x, 0, imgW - prevRect.width);
          newRect.y = clamp(currentY - offset.y, 0, imgH - prevRect.height);
        }
        return newRect;
      });
    },
    [
      isDrawing,
      isResizing,
      resizeHandle,
      isMoving,
      startPoint,
      offset,
      imageSrc,
    ],
  );

  /**
   * Handles mouse up event to end drawing, resizing, or moving.
   */
  const handleMouseUp = useCallback(() => {
    if (isDrawing || isResizing || isMoving) {
      // After any interaction, check if a valid crop area exists
      if (cropRect.width > 0 && cropRect.height > 0) {
        setMessage('Crop area selected. Click "Crop Image" to finalize.');
      } else {
        setMessage("Drag to select crop area.");
        setCropRect({ x: 0, y: 0, width: 0, height: 0 }); // Clear invalid crop
      }
    }
    setIsDrawing(false);
    setIsResizing(false);
    setResizeHandle(null);
    setIsMoving(false);
  }, [isDrawing, isResizing, isMoving, cropRect]); // Depend on cropRect to check its validity

  /**
   * Performs the image cropping based on the selected rectangle.
   */
  const handleCrop = () => {
    if (
      !originalImage ||
      !canvasRef.current ||
      cropRect.width === 0 ||
      cropRect.height === 0
    ) {
      setMessage("Please select an image and define a valid crop area first.");
      return;
    }

    setMessage("Cropping image...");

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Calculate scaling factor between displayed image and original image
    const imageElement = imageRef.current;
    const scaleX = originalImage.width / imageElement.offsetWidth;
    const scaleY = originalImage.height / imageElement.offsetHeight;

    // Adjust crop coordinates to original image dimensions
    const sourceX = cropRect.x * scaleX;
    const sourceY = cropRect.y * scaleY;
    const sourceWidth = cropRect.width * scaleX;
    const sourceHeight = cropRect.height * scaleY;

    // Set canvas dimensions to the cropped area's dimensions
    canvas.width = sourceWidth;
    canvas.height = sourceHeight;

    // Draw the cropped portion of the original image onto the canvas
    ctx.drawImage(
      originalImage,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      sourceWidth,
      sourceHeight,
    );

    // Get the data URL of the cropped image
    const croppedDataUrl = canvas.toDataURL("image/png");
    setCroppedImageSrc(croppedDataUrl);
    setMessage("Image cropped successfully! Download or select a new area.");
  };

  // Attach global mouseup/mousemove listeners to handle cases where mouse leaves image container
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]); // Re-attach if handlers change (due to useCallback deps)

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800 flex flex-col items-center">
      <script src="https://cdn.tailwindcss.com"></script>

      <div className="card">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Image Cropper
        </h1>

        {/* File Input */}
        <div className="flex flex-col items-center space-y-4">
          <label
            htmlFor="image-upload"
            className="block text-lg font-medium text-gray-700"
          >
            Upload Image:
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="input-field"
          />
        </div>

        {/* Status Message */}
        {message && (
          <p className="text-center text-gray-600 mt-4 p-2 bg-gray-50 rounded-md">
            {message}
          </p>
        )}

        {/* Image Display and Cropping Area */}
        {imageSrc && (
          <div
            className={`image-container mt-6 ${isResizing || isMoving ? "resizing" : ""}`}
            onMouseDown={handleMouseDown}
            // MouseMove and MouseUp are now handled globally on window for better UX
            // onMouseMove={handleMouseMove}
            // onMouseUp={handleMouseUp}
            // onMouseLeave={handleMouseUp} // This is no longer needed with global listeners
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Uploaded for cropping"
              className="max-w-full h-auto block rounded-lg shadow-md"
              style={{ userSelect: "none", pointerEvents: "auto" }} // Ensure image is interactable
              draggable="false" // Prevent default image drag behavior
            />
            {/* Cropping overlay and handles */}
            {cropRect.width > 0 && cropRect.height > 0 && (
              <div
                className={`cropping-overlay ${isResizing || isMoving ? "resizing-cursor" : ""}`}
                style={{
                  left: cropRect.x,
                  top: cropRect.y,
                  width: cropRect.width,
                  height: cropRect.height,
                }}
                // Prevent default drag of the overlay itself when interacting with handles
                onMouseDown={(e) => {
                  // Only allow moving if not clicking on a handle
                  if (!e.target.dataset.handle) {
                    handleMouseDown(e);
                  }
                }}
              >
                {/* Resize Handles */}
                <div
                  className="resize-handle handle-nw"
                  style={{ top: 0, left: 0 }}
                  data-handle="nw"
                ></div>
                <div
                  className="resize-handle handle-n"
                  style={{ top: 0, left: "50%" }}
                  data-handle="n"
                ></div>
                <div
                  className="resize-handle handle-ne"
                  style={{ top: 0, right: 0 }}
                  data-handle="ne"
                ></div>
                <div
                  className="resize-handle handle-e"
                  style={{ top: "50%", right: 0 }}
                  data-handle="e"
                ></div>
                <div
                  className="resize-handle handle-se"
                  style={{ bottom: 0, right: 0 }}
                  data-handle="se"
                ></div>
                <div
                  className="resize-handle handle-s"
                  style={{ bottom: 0, left: "50%" }}
                  data-handle="s"
                ></div>
                <div
                  className="resize-handle handle-sw"
                  style={{ bottom: 0, left: 0 }}
                  data-handle="sw"
                ></div>
                <div
                  className="resize-handle handle-w"
                  style={{ top: "50%", left: 0 }}
                  data-handle="w"
                ></div>
              </div>
            )}
          </div>
        )}

        {/* Crop Button */}
        {imageSrc && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleCrop}
              disabled={
                !imageSrc || cropRect.width === 0 || cropRect.height === 0
              }
              className="btn-primary"
            >
              Crop Image
            </button>
          </div>
        )}

        {/* Cropped Image Display */}
        {croppedImageSrc && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Cropped Image:
            </h2>
            <img
              src={croppedImageSrc}
              alt="Cropped"
              className="max-w-full h-auto mx-auto rounded-lg shadow-lg border border-gray-200"
            />
            <a
              href={croppedImageSrc}
              download="cropped-image.png"
              className="btn-primary mt-4 inline-block"
            >
              Download Cropped Image
            </a>
          </div>
        )}

        {/* Hidden Canvas for actual image processing */}
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
    </div>
  );
}

export default ImageCropper;
