$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$brandPublicPath = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../public'))
$brandSourcePath = Join-Path $brandPublicPath 'dreamglobal-symbol-v3.png'
$brandSourceImage = [System.Drawing.Image]::FromFile($brandSourcePath)
try {
  foreach ($iconSize in @(16, 32, 48, 180, 192, 256, 512)) {
    $iconBitmap = [System.Drawing.Bitmap]::new($iconSize, $iconSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $iconGraphics = [System.Drawing.Graphics]::FromImage($iconBitmap)
    try {
      $iconGraphics.Clear([System.Drawing.Color]::Transparent)
      $iconGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $iconGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $iconScale = [Math]::Min($iconSize / $brandSourceImage.Width, $iconSize / $brandSourceImage.Height)
      $iconWidth = [int][Math]::Round($brandSourceImage.Width * $iconScale)
      $iconHeight = [int][Math]::Round($brandSourceImage.Height * $iconScale)
      $iconX = [int][Math]::Floor(($iconSize - $iconWidth) / 2)
      $iconY = [int][Math]::Floor(($iconSize - $iconHeight) / 2)
      $iconGraphics.DrawImage($brandSourceImage, $iconX, $iconY, $iconWidth, $iconHeight)
      $iconBitmap.Save((Join-Path $brandPublicPath "dreamglobal-icon-v3-$iconSize.png"), [System.Drawing.Imaging.ImageFormat]::Png)
    } finally {
      $iconGraphics.Dispose()
      $iconBitmap.Dispose()
    }
  }
} finally {
  $brandSourceImage.Dispose()
}

# Store PNG frames in an ICO container, preserving the original logo and transparency.
$icoSizes = @(16, 32, 48, 256)
$icoImages = @($icoSizes | ForEach-Object { ,([System.IO.File]::ReadAllBytes((Join-Path $brandPublicPath "dreamglobal-icon-v3-$_.png"))) })
$icoStream = [System.IO.File]::Create((Join-Path $brandPublicPath 'dreamglobal-icon-v3.ico'))
$icoWriter = [System.IO.BinaryWriter]::new($icoStream)
try {
  $icoWriter.Write([uint16]0)
  $icoWriter.Write([uint16]1)
  $icoWriter.Write([uint16]$icoSizes.Count)
  $icoOffset = 6 + (16 * $icoSizes.Count)
  for ($frameIndex = 0; $frameIndex -lt $icoSizes.Count; $frameIndex++) {
    $icoDimension = if ($icoSizes[$frameIndex] -eq 256) { 0 } else { $icoSizes[$frameIndex] }
    $icoWriter.Write([byte]$icoDimension)
    $icoWriter.Write([byte]$icoDimension)
    $icoWriter.Write([byte]0)
    $icoWriter.Write([byte]0)
    $icoWriter.Write([uint16]1)
    $icoWriter.Write([uint16]32)
    $icoWriter.Write([uint32]$icoImages[$frameIndex].Length)
    $icoWriter.Write([uint32]$icoOffset)
    $icoOffset += $icoImages[$frameIndex].Length
  }
  foreach ($icoImage in $icoImages) { $icoWriter.Write([byte[]]$icoImage) }
} finally {
  $icoWriter.Dispose()
  $icoStream.Dispose()
}
Write-Output 'Exported DreamGlobal PNG and ICO browser icons from the supplied logo.'
