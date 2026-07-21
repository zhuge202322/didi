Add-Type -AssemblyName System.Drawing

function Export-Crop {
  param(
    [string]$Source,
    [string]$Target,
    [int]$X,
    [int]$Y,
    [int]$Width,
    [int]$Height,
    [int]$Scale = 1
  )

  $sourcePath = (Resolve-Path $Source).Path
  $image = [System.Drawing.Bitmap]::FromFile($sourcePath)
  try {
    $targetWidth = $Width * $Scale
    $targetHeight = $Height * $Scale
    $canvas = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($canvas)
      try {
        $graphics.Clear([System.Drawing.Color]::White)
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $sourceRect = New-Object System.Drawing.Rectangle($X, $Y, $Width, $Height)
        $targetRect = New-Object System.Drawing.Rectangle(0, 0, $targetWidth, $targetHeight)
        $graphics.DrawImage($image, $targetRect, $sourceRect, [System.Drawing.GraphicsUnit]::Pixel)
      }
      finally {
        $graphics.Dispose()
      }
      $targetPath = Join-Path (Get-Location) $Target
      $canvas.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
      $canvas.Dispose()
    }
  }
  finally {
    $image.Dispose()
  }
}

Export-Crop 'public/assets/mega-inverter.png' 'public/products/mega-installation.png' 55 270 1090 950 1
Export-Crop 'public/assets/battery-300.png' 'public/products/battery-280ah.png' 120 315 320 185 3
Export-Crop 'public/assets/battery-300.png' 'public/products/battery-300ah.png' 445 315 345 185 3
Export-Crop 'public/assets/battery-600.png' 'public/products/battery-400ah.png' 130 315 270 185 3
Export-Crop 'public/assets/battery-600.png' 'public/products/battery-460ah.png' 390 315 285 185 3
Export-Crop 'public/assets/battery-600.png' 'public/products/battery-600ah.png' 680 315 350 185 3
