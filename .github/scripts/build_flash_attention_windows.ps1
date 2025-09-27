param(
    [Parameter(Mandatory=$true)]
    [string]$FlashAttnVersion,
    
    [Parameter(Mandatory=$true)]
    [string]$PythonVersion,
    
    [Parameter(Mandatory=$true)]
    [string]$TorchVersion,
    
    [Parameter(Mandatory=$true)]
    [string]$CudaVersion
)

$ErrorActionPreference = "Stop"

if ($FlashAttnVersion -eq "latest") {
    Write-Host "Input is 'latest', determining the latest version of Flash Attention..."
    $latestTag = gh release list --repo Dao-AILab/flash-attention --limit 1 --json tagName --jq '.[0].tagName'
    # dynamically found version (e.g., "v2.5.9.post1")
    $FlashAttnVersion = $latestTag
    Write-Host "Latest version found: $FlashAttnVersion"
}

$MatrixCudaVersion = $CudaVersion -replace '\.', ''
$MatrixTorchVersion = $TorchVersion -replace '^(\d+\.\d+).*', '$1'
$env:TORCH_CUDA_VERSION = python .github/scripts/get_torch_cuda_version.py $MatrixCudaVersion $MatrixTorchVersion
Write-Host "Installing PyTorch $TorchVersion+cu$env:TORCH_CUDA_VERSION..."
pip install --force-reinstall --no-cache-dir torch==$TorchVersion --index-url https://download.pytorch.org/whl/cu$env:TORCH_CUDA_VERSION

Write-Host "Checking out flash-attention at ref $FlashAttnVersion..."
# The -b flag works for both tags (like "v2.5.9.post1") and branches.
git clone https://github.com/Dao-AILab/flash-attention.git -b $FlashAttnVersion --depth 1

Write-Host "Building wheels..."
$env:DISTUTILS_USE_SDK = 1
$env:FLASH_ATTENTION_FORCE_BUILD = "TRUE"

cd flash-attention
python setup.py bdist_wheel --dist-dir=dist

Write-Host "Renaming wheel with custom version tag..."
$baseWheelName = (Get-ChildItem -Path "dist\*.whl")[0].Name
$packageVersionFromFile = ($baseWheelName -split '-')[1]
$versionTag = python -c "import torch; from packaging.version import parse; v_cuda = ''.join(map(str, parse(torch.version.cuda).release)); v_torch = '.'.join(map(str, parse(torch.__version__).release)); print(f'cu{v_cuda}torch{v_torch}cxx11abiFALSE')"
$parts = $baseWheelName -split '-', 3
$wheelName = "$($parts[0])-$($parts[1])+$versionTag-$($parts[2])"
Move-Item "dist\$baseWheelName" "dist\$wheelName" -Force
Write-Host "Built and renamed wheel: $wheelName"

$fullWheelPath = (Resolve-Path -Path "dist\$wheelName").Path
echo "wheel_path=$fullWheelPath" | Out-File -FilePath $env:GITHUB_OUTPUT -Encoding utf8 -Append
cd ..
