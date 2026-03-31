<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<!-- PROJECT LOGO -->
<a id="readme-top"></a>
<div align="center">
  <h1 align="center">Windows AI Wheels</h1>

<img src="https://github.com/user-attachments/assets/b5a86223-4134-4c1a-bce9-215c741be45d" alt="AI-windows-whl logo">

  <p align="center">
    A curated collection of pre-compiled Python wheels for difficult-to-install AI/ML libraries on Windows.
    <br />
    <br />
    <a href="https://github.com/wildminder/AI-windows-whl/issues/new?labels=bug&template=bug-report---.md">Report a Broken Link</a>
    ·
    <a href="https://github.com/wildminder/AI-windows-whl/issues/new?labels=enhancement&template=feature-request---.md">Request a New Wheel</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#available-wheels">Available Wheels</a>
      <ul>
        <li><a href="#pytorch">PyTorch</a></li>
        <li><a href="#flash-attention">Flash Attention</a></li>
        <li><a href="#xformers">xformers</a></li>
        <li><a href="#sageattention">SageAttention</a></li>
        <li><a href="#natten">NATTEN</a></li>
        <li><a href="#triton">Triton (Windows Fork)</a></li>
        <li><a href="#bitsandbytes">bitsandbytes</a></li>
        <li><a href="#other-packages">Other Packages</a></li>
      </ul>
    </li>
  </ol>
</details>

<div align="center">
<a href="#pytorch"><img width="120" height="52" alt="PyTorch" src="https://github.com/user-attachments/assets/aef4104c-5bc0-4741-8cc5-3e4a54efa080" /></a>
  <a href="#torchaudio"><img width="120" height="52" alt="Torchaudio" src="https://github.com/user-attachments/assets/5af2ea45-4626-442a-bc27-e958e02c7ca9" /></a>
  <a href="#flash-attention"><img width="120" height="52" alt="Flash Attention" src="https://github.com/user-attachments/assets/a7e8016f-ba3b-4355-b0fa-18e4d687346c" /></a>
<a href="#xformers"><img width="120" height="52" alt="xFormers" src="https://github.com/user-attachments/assets/3dab074e-7716-4416-a9f7-265368051ad0" /></a>    
  <a href="#sageattention"><img width="120" height="52" alt="SageAttention" src="https://github.com/user-attachments/assets/bb5d2c02-aa8c-4ddc-b239-b964dac6d542" /></a>
  <a href="#nunchaku"><img width="120" height="52" alt="Nunchaku" src="https://github.com/user-attachments/assets/e9389c4a-f64a-436c-b1cd-1718436bca82" /></a>
<a href="#natten"><img width="120" height="52" alt="Natten" src="https://github.com/user-attachments/assets/7e66e97e-d504-4e64-84b4-eb26faa01229" /></a>
<a href="#triton"><img width="120" height="52" alt="triton" src="https://github.com/user-attachments/assets/e44b931c-7599-47b5-bf05-715dc2fcf7f3" /></a>
<a href="#spargeattn"><img width="120" height="52" alt="SpargeAttn" src="https://github.com/user-attachments/assets/7aa0cdab-547d-453a-90df-f2e6e377aa8b" /></a>
<a href="#bitsandbytes"><img width="120" height="52" alt="bitsandbytes" src="https://github.com/user-attachments/assets/3497bfa8-da3f-4dc3-a617-1a30471ca2c2" /></a>  
</div>



<!-- ABOUT THE PROJECT -->
## About The Project

This repository was created to address a common pain point for AI enthusiasts and developers on the Windows platform: **building complex Python packages from source.** Libraries like `flash-attention`, `xformers` are essential for high-performance AI tasks but often lack official pre-built wheels for Windows, forcing users into a complicated and error-prone compilation process.

The goal here is to provide a centralized, up-to-date collection of direct links to pre-compiled `.whl` files for these libraries, primarily for the **ComfyUI** community and other PyTorch users on Windows. This saves you time and lets you focus on what's important: creating amazing things with AI.

### Find Windows AI Wheels
To make life even easier, you can use this page **[Find Windows AI Wheels](https://wildminder.github.io/AI-windows-whl/)** for quick searches of the required packages. 
<div align="center">
<a  href="https://wildminder.github.io/AI-windows-whl/">
<img width="70%" alt="image" src="https://github.com/user-attachments/assets/1ee65a8c-c9c1-4e17-8a49-d685bae3f5f2" />
</a>  
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

Follow these simple steps to use the wheels from this repository.

### Prerequisites

1.  **Python for Windows**: Ensure you have a compatible Python version installed (PyTorch currently supports **Python 3.9 - 3.14** on Windows). You can get it from the [official Python website](https://www.python.org/downloads/windows/).


### Installation

To install a wheel, use `pip` with the direct URL to the `.whl` file. Make sure to enclose the URL in quotes.

```sh
# Example of installing a specific flash-attention wheel
pip install "https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.4.post1+cu128torch2.7.0cxx11abiFALSE-cp312-cp312-win_amd64.whl"
```

> [!TIP]
> Find the package you need in the [Available Wheels](#available-wheels) section below, find the row that matches your environment (Python, PyTorch, CUDA version), and copy the link for the `pip install` command.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- AVAILABLE WHEELS -->
## Available Wheels

Here is the list of tracked packages.

<a id="pytorch"></a>
### 🛠 PyTorch
The foundation of everything. Install this first from the official source.
*   **Official Install Page**: [https://pytorch.org/get-started/locally/](https://pytorch.org/get-started/locally/)

For convenience, here are direct installation commands for specific versions on Linux/WSL with an NVIDIA GPU. For other configurations (CPU, macOS, ROCm), please use the official install page.

#### Stable Version (2.11.0)
This is the recommended version for most users.

| CUDA Version | Pip Install Command                                                                                      |
|:-------------|:---------------------------------------------------------------------------------------------------------|
| **CUDA 13.0**  | `pip install torch torchvision --index-url https://download.pytorch.org/whl/cu130` |
| **CUDA 12.8**  | `pip install torch torchvision --index-url https://download.pytorch.org/whl/cu128` |
| **CUDA 12.6**  | `pip install torch torchvision --index-url https://download.pytorch.org/whl/cu126` |

<details>
  <summary>Previous Stable Version</summary>

#### Stable Version (2.10.0)
This is the recommended version for most users.

| CUDA Version | Pip Install Command                                                                                      |
|:-------------|:---------------------------------------------------------------------------------------------------------|
| **CUDA 13.0**  | `pip install "torch>=2.10.0.dev,<2.11.0" torchvision --index-url https://download.pytorch.org/whl/cu130` |
| **CUDA 12.8**  | `pip install "torch>=2.10.0.dev,<2.11.0" torchvision --index-url https://download.pytorch.org/whl/cu128` |
| **CUDA 12.6**  | `pip install "torch>=2.10.0.dev,<2.11.0" torchvision --index-url https://download.pytorch.org/whl/cu126` |

#### Previous Version (2.9.1)

| CUDA Version | Pip Install Command                                                                                      |
|:-------------|:---------------------------------------------------------------------------------------------------------|
| **CUDA 13.0**  | `pip install "torch>=2.9.0.dev,<2.10.0" torchvision --index-url https://download.pytorch.org/whl/cu130` |
| **CUDA 12.8**  | `pip install "torch>=2.9.0.dev,<2.10.0" torchvision --index-url https://download.pytorch.org/whl/cu128` |
| **CUDA 12.6**  | `pip install "torch>=2.9.0.dev,<2.10.0" torchvision --index-url https://download.pytorch.org/whl/cu126` |

##### Previous Stable Version (2.8.0)  
| CUDA Version | Pip Install Command                                                              |
|:-------------|:---------------------------------------------------------------------------------|
| **CUDA 12.9**  | `pip install "torch>=2.8.0.dev,<2.9.0" torchvision --index-url https://download.pytorch.org/whl/cu129`           |
| **CUDA 12.8**  | `pip install "torch>=2.8.0.dev,<2.9.0" torchvision --index-url https://download.pytorch.org/whl/cu128`           |
| **CUDA 12.6**  | `pip install "torch>=2.8.0.dev,<2.9.0" torchvision --index-url https://download.pytorch.org/whl/cu126`           |

##### Previous Stable Version (2.7.1)
| CUDA Version | Pip Install Command                                                                                      |
|:-------------|:---------------------------------------------------------------------------------------------------------|
| **CUDA 12.8**  | `pip install torch==2.7.1 torchvision==0.22.1 torchaudio==2.7.1 --index-url https://download.pytorch.org/whl/cu128` |
| **CUDA 12.6**  | `pip install torch==2.7.1 torchvision==0.22.1 torchaudio==2.7.1 --index-url https://download.pytorch.org/whl/cu126` |
| **CUDA 11.8**  | `pip install torch==2.7.1 torchvision==0.22.1 torchaudio==2.7.1 --index-url https://download.pytorch.org/whl/cu118` |
| **CPU only**   | `pip install torch==2.7.1 torchvision==0.22.1 torchaudio==2.7.1 --index-url https://download.pytorch.org/whl/cpu`      |

</details>

---

#### Nightly Versions
Use these for access to the latest features, but expect potential instability.

**PyTorch 2.12 (Nightly)**
| CUDA Version | Pip Install Command                                                                                      |
|:-------------|:---------------------------------------------------------------------------------------------------------|
| **CUDA 13.0**  | `pip install --pre torch torchvision --index-url https://download.pytorch.org/whl/nightly/cu130` |
| **CUDA 12.8**  | `pip install --pre torch torchvision --index-url https://download.pytorch.org/whl/nightly/cu128` |
| **CUDA 12.6**  | `pip install --pre torch torchvision --index-url https://download.pytorch.org/whl/nightly/cu126` |

<p id="torchaudio" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 Torchaudio
<!-- START_TORCHAUDIO_TABLE -->
<!-- This table is auto-generated. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | CUDA Ver | Download Link |
|:---:|:---:|:---:|:---:|:---:|
| `2.11.0a0` | `2.12.0` | `3.14` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/torchaudio/torchaudio-2.11.0a0+d20260219.cu130torch2.12.0cxx11abi1-cp314-cp314-win_amd64.whl) |
| `2.11.0a0` | `2.12.0` | `3.13` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/torchaudio/torchaudio-2.11.0a0+d20260219.cu130torch2.12.0cxx11abi1-cp313-cp313-win_amd64.whl) |
| `2.11.0a0` | `2.11.0` | `3.14` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/torchaudio/torchaudio-2.11.0a0+d20260219.cu130torch2.11.0cxx11abi1-cp314-cp314-win_amd64.whl) |
| `2.11.0a0` | `2.11.0` | `3.13` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/torchaudio/torchaudio-2.11.0a0+d20260219.cu130torch2.11.0cxx11abi1-cp313-cp313-win_amd64.whl) |
| `2.11.0a0` | `2.10.0` | `3.13` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/torchaudio/torchaudio-2.11.0a0+d20260121.cu130torch2.10.0cxx11abi1-cp313-cp313-win_amd64.whl) |
| `2.11.0a0` | `2.10.0` | `3.12` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/torchaudio/torchaudio-2.11.0a0+d20260121.cu130torch2.10.0cxx11abi1-cp312-cp312-win_amd64.whl) |
| `2.11.0a0` | `2.10.0` | `3.13` | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/torchaudio/torchaudio-2.11.0a0+cu128torch2.10.0cxx11abi1-cp313-cp313-win_amd64.whl) |
| `2.8.0a0` | `2.9.0` | `3.12` | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/torchaudio/torchaudio-2.8.0a0+cu128torch2.9.0cxx11abi1-cp312-cp312-win_amd64.whl) |
| `2.8.0a0` | `2.9.0` | `3.12` | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/torchaudio/torchaudio-2.8.0a0+cu128torch2.9.0cxx11abi1-cp312-cp312-win_amd64.whl) |
<!-- END_TORCHAUDIO_TABLE -->

```sh
# Torchcodec
pip install torchcodec
```

<p id="flash-attention" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 Flash Attention
High-performance attention implementation.

[![GitHub](https://img.shields.io/badge/Dao--AILab-flash--attention-blue?style=flat)](https://github.com/Dao-AILab/flash-attention)
[![HuggingFace](https://img.shields.io/badge/lldacing-HF%20Wheels-orange?style=flat)](https://huggingface.co/lldacing/flash-attention-windows-wheel/tree/main)
[![HuggingFace](https://img.shields.io/badge/Wildminder-HF%20Wheels-orange?style=flat)](https://huggingface.co/Wildminder/AI-windows-whl/tree/main)
[![GitHub](https://img.shields.io/badge/mjun0812-Wheels-green?style=flat)](https://github.com/mjun0812/flash-attention-prebuild-wheels)

<!-- START_FLASHATTENTION_TABLE -->
<!-- This table is auto-generated. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | CUDA Ver | CXX11 ABI | Download Link |
|:---:|:---:|:---:|:---:|:---:|:---:|
| `2.8.4` | `2.12.0` | `3.14` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.4+d20260328cu130torch2.12.0cxx11abiTRUE-cp314-cp314-win_amd64.whl) |
| `2.8.4` | `2.12.0` | `3.13` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.4+d20260328cu130torch2.12.0cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
| `2.8.4` | `2.11.0` | `3.14` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.4+d20260328cu130torch2.11.0cxx11abiTRUE-cp314-cp314-win_amd64.whl) |
| `2.8.4` | `2.11.0` | `3.13` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.4+d20260328cu130torch2.11.0cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
| `2.8.3` | `2.11.0` | `3.13` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3+cu130torch2.11.0cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
| `2.8.3` | `2.11.0` | `3.12` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3%2Bd20260120.cu130torch2.11.0cxx11abiTRUE-cp312-cp312-win_amd64.whl) |
| `2.8.3` | `2.10.0` | `3.13` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3%2Bd20260121.cu130torch2.10.0cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
| `2.8.3` | `2.10.0` | `3.13` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3+cu130torch2.10.0cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
| `2.8.3` | `2.10.0` | `3.12` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3%2Bd20260121.cu130torch2.10.0cxx11abiTRUE-cp312-cp312-win_amd64.whl) |
| `2.8.3` | `2.10.0` | `3.12` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3+cu130torch2.10.0cxx11abiTRUE-cp312-cp312-win_amd64.whl) |
| `2.8.3` | `2.10.0` | `3.13` | `12.8` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3+cu128torch2.10.0cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
| `2.8.3` | `2.9.1` | `3.13` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3%2Bcu130torch2.9.1cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
| `2.8.3` | `2.9.1` | `3.12` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3%2Bcu130torch2.9.1cxx11abiTRUE-cp312-cp312-win_amd64.whl) |
| `2.8.3` | `2.9.1` | `3.13` | `12.8` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3%2Bcu128torch2.9.1cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
| `2.8.3` | `2.9.0` | `3.13` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3+cu130torch2.9.0cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
| `2.8.3` | `2.9.0` | `3.12` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3%2Bcu130torch2.9.0cxx11abiTRUE-cp312-cp312-win_amd64.whl) |
| `2.8.3` | `2.9.0` | `3.13` | `12.9` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3+cu129torch2.9.0cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
| `2.8.3` | `2.9.0` | `3.12` | `12.8` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3+cu128torch2.9.0cxx11abiTRUE-cp312-cp312-win_amd64.whl) |
| `2.8.3` | `2.8.0` | `3.12` | `12.8` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3+cu128torch2.8.0cxx11abiTRUE-cp312-cp312-win_amd64.whl) |
| `2.8.2` | `2.9.0` | `3.12` | `12.8` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.2%2Bcu128torch2.9.0cxx11abiTRUE-cp312-cp312-win_amd64.whl?download=true) |
| `2.8.2` | `2.8.0` | `3.12` | `12.8` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.2%2Bcu128torch2.8.0cxx11abiTRUE-cp312-cp312-win_amd64.whl?download=true) |
| `2.8.2` | `2.8.0` | `3.11` | `12.8` | ✓ | [Link](https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.4.10/flash_attn-2.8.2+cu128torch2.8-cp311-cp311-win_amd64.whl) |
| `2.8.2` | `2.8.0` | `3.10` | `12.8` | ✓ | [Link](https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.4.10/flash_attn-2.8.2+cu128torch2.8-cp310-cp310-win_amd64.whl) |
| `2.8.2` | `2.7.0` | `3.12` | `12.8` | ✗ | [Link](https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.4.10/flash_attn-2.8.2+cu128torch2.7-cp312-cp312-win_amd64.whl) |
| `2.8.2` | `2.7.0` | `3.11` | `12.8` | ✗ | [Link](https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.4.10/flash_attn-2.8.2+cu128torch2.7-cp311-cp311-win_amd64.whl) |
| `2.8.2` | `2.7.0` | `3.10` | `12.8` | ✗ | [Link](https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.4.10/flash_attn-2.8.2+cu128torch2.7-cp310-cp310-win_amd64.whl) |
| `2.8.1` | `2.8.0` | `3.12` | `12.8` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.1%2Bcu128torch2.8.0cxx11abiTRUE-cp312-cp312-win_amd64.whl?download=true) |
| `2.8.0.post2` | `2.8.0` | `3.12` | `12.8` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.0.post2+cu128torch2.8.0cxx11abiTRUE-cp312-cp312-win_amd64.whl?download=true) |
| `2.7.4.post1` | `2.8.0` | `3.12` | `12.8` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.7.4.post1+cu128torch2.8.0cxx11abiTRUE-cp312-cp312-win_amd64.whl?download=true) |
| `2.7.4.post1` | `2.8.0` | `3.10` | `12.8` | ✓ | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/resolve/main/flash_attn-2.7.4.post1+cu128torch2.8.0cxx11abiTRUE-cp310-cp310-win_amd64.whl?download=true) |
| `2.7.4.post1` | `2.7.0` | `3.12` | `12.8` | ✗ | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/resolve/main/flash_attn-2.7.4.post1+cu128torch2.7.0cxx11abiFALSE-cp312-cp312-win_amd64.whl?download=true) |
| `2.7.4.post1` | `2.7.0` | `3.11` | `12.8` | ✗ | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/resolve/main/flash_attn-2.7.4.post1+cu128torch2.7.0cxx11abiFALSE-cp311-cp311-win_amd64.whl?download=true) |
| `2.7.4.post1` | `2.7.0` | `3.10` | `12.8` | ✗ | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/resolve/main/flash_attn-2.7.4.post1+cu128torch2.7.0cxx11abiFALSE-cp310-cp310-win_amd64.whl?download=true) |
| `2.7.4` | `2.8.0` | `3.12` | `12.8` | ✓ | [Link](https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.4.10/flash_attn-2.7.4+cu128torch2.8-cp312-cp312-win_amd64.whl) |
| `2.7.4` | `2.8.0` | `3.11` | `12.8` | ✓ | [Link](https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.4.10/flash_attn-2.7.4+cu128torch2.8-cp311-cp311-win_amd64.whl) |
| `2.7.4` | `2.8.0` | `3.10` | `12.8` | ✓ | [Link](https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.4.10/flash_attn-2.7.4+cu128torch2.8-cp310-cp310-win_amd64.whl) |
| `2.7.4` | `2.7.0` | `3.12` | `12.8` | ✗ | [Link](https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.4.10/flash_attn-2.7.4+cu128torch2.7-cp312-cp312-win_amd64.whl) |
| `2.7.4` | `2.7.0` | `3.11` | `12.8` | ✗ | [Link](https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.4.9/flash_attn-2.7.4+cu128torch2.7-cp311-cp311-win_amd64.whl) |
| `2.7.4` | `2.7.0` | `3.10` | `12.8` | ✗ | [Link](https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.4.10/flash_attn-2.7.4+cu128torch2.7-cp310-cp310-win_amd64.whl) |
| `2.7.4` | `2.6.0` | `3.12` | `12.6` | ✗ | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/resolve/main/flash_attn-2.7.4+cu126torch2.6.0cxx11abiFALSE-cp312-cp312-win_amd64.whl?download=true) |
| `2.7.4` | `2.6.0` | `3.11` | `12.6` | ✗ | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/resolve/main/flash_attn-2.7.4+cu126torch2.6.0cxx11abiFALSE-cp311-cp311-win_amd64.whl?download=true) |
| `2.7.4` | `2.6.0` | `3.10` | `12.6` | ✗ | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/resolve/main/flash_attn-2.7.4+cu126torch2.6.0cxx11abiFALSE-cp310-cp310-win_amd64.whl?download=true) |
| `2.7.4` | `2.6.0` | `3.12` | `12.4` | ✗ | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/resolve/main/flash_attn-2.7.4+cu124torch2.6.0cxx11abiFALSE-cp312-cp312-win_amd64.whl?download=true) |
| `2.7.4` | `2.6.0` | `3.11` | `12.4` | ✗ | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/resolve/main/flash_attn-2.7.4+cu124torch2.6.0cxx11abiFALSE-cp311-cp311-win_amd64.whl?download=true) |
| `2.7.4` | `2.6.0` | `3.10` | `12.4` | ✗ | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/resolve/main/flash_attn-2.7.4+cu124torch2.6.0cxx11abiFALSE-cp310-cp310-win_amd64.whl?download=true) |
<!-- END_FLASHATTENTION_TABLE -->

<p id="flash-attention-3" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 Flash Attention 3
Next-generation Flash Attention with improved performance and features.

[![GitHub](https://img.shields.io/badge/windreamer-FA3%20Wheels-blue?style=flat)](https://github.com/windreamer/flash-attention-3-wheels-windows)
[![GitHub](https://img.shields.io/badge/mjun0812-FA3%20Wheels-green?style=flat)](https://github.com/mjun0812/flash-attention-3-wheels-windows)

<!-- START_FLASHATTENTION3_TABLE -->
<!-- This table is auto-generated. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | CUDA Ver | CXX11 ABI | Download Link |
|:---:|:---:|:---:|:---:|:---:|:---:|
| `3.0.0` | `2.10` | `3.9+` | `13.0` | ✓ | [Link](https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.9.3/flash_attn_3-3.0.0+cu130torch2.10gite2743ab-cp39-abi3-win_amd64.whl) |
| `3.0.0` | `2.10` | `3.9+` | `13.0` | ✓ | [Link](https://github.com/windreamer/flash-attention3-wheels/releases/download/2026.03.19-850211f/flash_attn_3-3.0.0+20260318.cu130torch2100cxx11abitrue.8afc61-cp39-abi3-win_amd64.whl) |
| `3.0.0` | `2.10` | `3.9+` | `12.8` | ✓ | [Link](https://github.com/windreamer/flash-attention3-wheels/releases/download/2026.03.19-850211f/flash_attn_3-3.0.0+20260318.cu128torch2100cxx11abitrue.8afc61-cp39-abi3-win_amd64.whl) |
| `3.0.0` | `2.10` | `3.9+` | `12.8` | ✓ | [Link](https://github.com/windreamer/flash-attention3-wheels/releases/download/2026.03.19-850211f/flash_attn_3-3.0.0+20260318.cu128torch280cxx11abitrue.8afc61-cp39-abi3-win_amd64.whl) |
| `3.0.0` | `2.9` | `3.9+` | `13.0` | ✓ | [Link](https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.9.3/flash_attn_3-3.0.0+cu130torch2.9gite2743ab-cp39-abi3-win_amd64.whl) |
| `3.0.0` | `2.9` | `3.9+` | `12.8` | ✓ | [Link](https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.9.3/flash_attn_3-3.0.0+cu128torch2.9gite2743ab-cp39-abi3-win_amd64.whl) |
<!-- END_FLASHATTENTION3_TABLE -->

<p id="flash-attention-4" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 Flash Attention 4
Latest Flash Attention implementation with cutting-edge optimizations.

<!-- START_FLASHATTENTION4_TABLE -->
<!-- This table is auto-generated. Do not edit manually. -->
*(No wheels available - package not tracked)*
<!-- END_FLASHATTENTION4_TABLE -->

<p id="xformers" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 xformers
Another library for memory-efficient attention and other optimizations.

[![GitHub](https://img.shields.io/badge/facebookresearch-xformers-blue?style=flat)](https://github.com/facebookresearch/xformers/releases)
[![PyTorch](https://img.shields.io/badge/PyTorch-Wheels-red?style=flat)](https://download.pytorch.org/whl/xformers/)
> [!NOTE]
> PyTorch provides official pre-built wheels for xformers. You can often install it with `pip install xformers`


| CUDA Version | Install |
|:---:|:---|
| **CUDA 12.6** | `pip3 install -U xformers --index-url https://download.pytorch.org/whl/cu126` |
| **CUDA 12.8** | `pip3 install -U xformers --index-url https://download.pytorch.org/whl/cu128` |
| **CUDA 13.0** | `pip3 install -U xformers --index-url https://download.pytorch.org/whl/cu130` |

ABI3 version, any Python 3.9-3.12

<!-- START_XFORMERS_TABLE -->
<!-- This table is auto-generated. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | CUDA Ver | Download Link |
|:---:|:---:|:---:|:---:|:---:|
| `0.0.34` | `2.11` | `3.9+` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/xformers-0.0.34+torch2.11cu130-cp39-abi3-win_amd64.whl) |
| `0.0.34` | `2.10` | `3.9+` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/xformers-0.0.34%2Bd20260123.cu130torch2.10-cp39-abi3-win_amd64.whl) |
| `0.0.34` | `2.10` | `3.9+` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/xformers-0.0.34+torch2.10cu130-cp39-abi3-win_amd64.whl) |
| `0.0.33` | `2.10` | `3.9+` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/xformers-0.0.33%2Bcu130torch2.10-cp39-abi3-win_amd64.whl) |
| `0.0.33` | `2.9` | `3.9+` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/xformers-0.0.33%2Bcu130torch2.9-cp39-abi3-win_amd64.whl) |
| `0.0.32.post2` | `2.8.0` | `3.9+` | `12.9` | [Link](https://download.pytorch.org/whl/cu129/xformers-0.0.32.post2-cp39-abi3-win_amd64.whl) |
| `0.0.32.post2` | `2.8.0` | `3.9+` | `12.8` | [Link](https://download.pytorch.org/whl/cu128/xformers-0.0.32.post2-cp39-abi3-win_amd64.whl) |
| `0.0.32.post2` | `2.8.0` | `3.9+` | `12.6` | [Link](https://download.pytorch.org/whl/cu126/xformers-0.0.32.post2-cp39-abi3-win_amd64.whl) |
<!-- END_XFORMERS_TABLE --> 

<p id="sageattention" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 SageAttention

[![GitHub](https://img.shields.io/badge/thu--ml-SageAttention-blue?style=flat)](https://github.com/thu-ml/SageAttention)
[![GitHub](https://img.shields.io/badge/woct0rdho-Wheels-green?style=flat)](https://github.com/woct0rdho/SageAttention/releases)
[![HuggingFace](https://img.shields.io/badge/Wildminder-HF%20Wheels-orange?style=flat)](https://huggingface.co/Wildminder/AI-windows-whl/tree/main)

<!-- START_SAGEATTENTION2_TABLE -->
<!-- This table is auto-generated. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | CUDA Ver | Download Link |
|:---:|:---:|:---:|:---:|:---:|
| `2.1.1` | `2.8.0` | `3.12` | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.1.1+cu128torch2.8.0-cp312-cp312-win_amd64.whl?download=true) |
| `2.1.1` | `2.7.0` | `3.10` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu128torch2.7.0-cp310-cp310-win_amd64.whl) |
| `2.1.1` | `2.6.0` | `3.13` | `12.6` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu126torch2.6.0-cp313-cp313-win_amd64.whl) |
| `2.1.1` | `2.6.0` | `3.12` | `12.6` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu126torch2.6.0-cp312-cp312-win_amd64.whl) |
| `2.1.1` | `2.6.0` | `3.12` | `12.6` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.1.1+cu126torch2.6.0-cp312-cp312-win_amd64.whl?download=true) |
| `2.1.1` | `2.6.0` | `3.11` | `12.6` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu126torch2.6.0-cp311-cp311-win_amd64.whl) |
| `2.1.1` | `2.6.0` | `3.10` | `12.6` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu126torch2.6.0-cp310-cp310-win_amd64.whl) |
| `2.1.1` | `2.6.0` | `3.9` | `12.6` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu126torch2.6.0-cp39-cp39-win_amd64.whl) |
| `2.1.1` | `2.5.1` | `3.12` | `12.4` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu124torch2.5.1-cp312-cp312-win_amd64.whl) |
| `2.1.1` | `2.5.1` | `3.11` | `12.4` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu124torch2.5.1-cp311-cp311-win_amd64.whl) |
| `2.1.1` | `2.5.1` | `3.10` | `12.4` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu124torch2.5.1-cp310-cp310-win_amd64.whl) |
| `2.1.1` | `2.5.1` | `3.9` | `12.4` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu124torch2.5.1-cp39-cp39-win_amd64.whl) |
<!-- END_SAGEATTENTION2_TABLE -->

◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇

#### 🛠 SageAttention 2.2 (SageAttention2++)
> [!NOTE]
> Only supports CUDA >= 12.8, therefore PyTorch >= 2.7.

<!-- START_SAGEATTENTION22_TABLE -->
<!-- This table is auto-generated. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | CUDA Ver | Download Link |
|:---:|:---:|:---:|:---:|:---:|
| `2.2.0.post4` | `2.9.0+` | `3.9+` | `13.0` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post4/sageattention-2.2.0+cu130torch2.9.0andhigher.post4-cp39-abi3-win_amd64.whl) |
| `2.2.0.post4` | `2.9.0+` | `3.9+` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post4/sageattention-2.2.0+cu128torch2.9.0andhigher.post4-cp39-abi3-win_amd64.whl) |
| `2.2.0.post3` | `2.10.0` | `3.12` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu130torch2.10.0-cp312-cp312-win_amd64.whl) |
| `2.2.0.post3` | `2.10.0` | `3.13` | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu128torch2.10.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.10.0` | `3.12` | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu128torch2.10.0-cp312-cp312-win_amd64.whl) |
| `2.2.0.post3` | `2.9.0` | `3.13` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu130torch2.9.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.9.0` | `3.13` | `12.9` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu129torch2.9.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.9.0` | `3.9+` | `12.9` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu129torch2.9.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.9.0` | `3.13` | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu128torch2.9.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.9.0` | `3.9+` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post3/sageattention-2.2.0+cu128torch2.9.0.post3-cp39-abi3-win_amd64.whl) |
| `2.2.0.post3` | `2.8.0` | `3.13` | `12.9` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu129torch2.8.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.8.0` | `3.9+` | `12.9` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu129torch2.8.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.8.0` | `3.13` | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu128torch2.8.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.8.0` | `3.9+` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post3/sageattention-2.2.0+cu128torch2.8.0.post3-cp39-abi3-win_amd64.whl) |
| `2.2.0.post3` | `2.7.1` | `3.9+` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post3/sageattention-2.2.0+cu128torch2.7.1.post3-cp39-abi3-win_amd64.whl) |
| `2.2.0.post3` | `2.6.0` | `3.9+` | `12.6` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post3/sageattention-2.2.0+cu126torch2.6.0.post3-cp39-abi3-win_amd64.whl) |
| `2.2.0.post3` | `2.5.1` | `3.9+` | `12.4` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post3/sageattention-2.2.0+cu124torch2.5.1.post3-cp39-abi3-win_amd64.whl) |
| `2.2.0.post2` | `2.9.0` | `3.9+` | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0%2Bcu128torch2.9.0cxx11abi1-cp312-cp312-win_amd64.whl?download=true) |
| `2.2.0.post2` | `2.8.0` | `3.9+` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post2/sageattention-2.2.0+cu128torch2.8.0.post2-cp39-abi3-win_amd64.whl) |
| `2.2.0.post2` | `2.7.1` | `3.9+` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post2/sageattention-2.2.0+cu128torch2.7.1.post2-cp39-abi3-win_amd64.whl) |
| `2.2.0.post2` | `2.6.0` | `3.9+` | `12.6` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post2/sageattention-2.2.0+cu126torch2.6.0.post2-cp39-abi3-win_amd64.whl) |
| `2.2.0.post2` | `2.5.1` | `3.9+` | `12.4` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post2/sageattention-2.2.0+cu124torch2.5.1.post2-cp39-abi3-win_amd64.whl) |
| `2.2.0` | `2.8.0` | `3.13` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.8.0-cp313-cp313-win_amd64.whl) |
| `2.2.0` | `2.8.0` | `3.12` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.8.0-cp312-cp312-win_amd64.whl) |
| `2.2.0` | `2.8.0` | `3.11` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.8.0-cp311-cp311-win_amd64.whl) |
| `2.2.0` | `2.8.0` | `3.10` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.8.0-cp310-cp310-win_amd64.whl) |
| `2.2.0` | `2.8.0` | `3.9` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.8.0-cp39-cp39-win_amd64.whl) |
| `2.2.0` | `2.7.1` | `3.13` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.7.1-cp313-cp313-win_amd64.whl) |
| `2.2.0` | `2.7.1` | `3.12` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.7.1-cp312-cp312-win_amd64.whl) |
| `2.2.0` | `2.7.1` | `3.11` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.7.1-cp311-cp311-win_amd64.whl) |
| `2.2.0` | `2.7.1` | `3.10` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.7.1-cp310-cp310-win_amd64.whl) |
| `2.2.0` | `2.7.1` | `3.9` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.7.1-cp39-cp39-win_amd64.whl) |
<!-- END_SAGEATTENTION22_TABLE -->

<p id="nunchaku" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 Nunchaku
*   **Official Repo**: : [mit-han-lab/nunchaku](https://github.com/mit-han-lab/nunchaku/releases)
<!-- START_NUNCHAKU_TABLE -->
<!-- This table is auto-generated. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | Download Link |
|:---:|:---:|:---:|:---:|
| `1.2.0` | `2.11` | `3.13` | [Link](https://github.com/nunchaku-ai/nunchaku/releases/download/v1.2.0/nunchaku-1.2.0+torch2.11-cp313-cp313-win_amd64.whl) |
| `1.2.0` | `2.11` | `3.12` | [Link](https://github.com/nunchaku-ai/nunchaku/releases/download/v1.2.0/nunchaku-1.2.0+torch2.11-cp312-cp312-win_amd64.whl) |
| `1.2.0` | `2.11` | `3.11` | [Link](https://github.com/nunchaku-ai/nunchaku/releases/download/v1.2.0/nunchaku-1.2.0+torch2.11-cp311-cp311-win_amd64.whl) |
| `1.2.0` | `2.11` | `3.10` | [Link](https://github.com/nunchaku-ai/nunchaku/releases/download/v1.2.0/nunchaku-1.2.0+torch2.11-cp310-cp310-win_amd64.whl) |
| `1.2.0` | `2.9` | `3.13` | [Link](https://github.com/nunchaku-ai/nunchaku/releases/download/v1.2.0/nunchaku-1.2.0+torch2.9-cp313-cp313-win_amd64.whl) |
| `1.2.0` | `2.9` | `3.12` | [Link](https://github.com/nunchaku-ai/nunchaku/releases/download/v1.2.0/nunchaku-1.2.0+torch2.9-cp312-cp312-win_amd64.whl) |
| `1.2.0` | `2.9` | `3.11` | [Link](https://github.com/nunchaku-ai/nunchaku/releases/download/v1.2.0/nunchaku-1.2.0+torch2.9-cp311-cp311-win_amd64.whl) |
| `1.2.0` | `2.9` | `3.10` | [Link](https://github.com/nunchaku-ai/nunchaku/releases/download/v1.2.0/nunchaku-1.2.0+torch2.9-cp310-cp310-win_amd64.whl) |
| `1.2.0` | `2.8` | `3.13` | [Link](https://huggingface.co/JusteLeo/Nunchaku-Zimage-Win-Wheels/resolve/main/nunchaku-1.2.0%2Btorch2.8-cp313-cp313-win_amd64.whl) |
| `1.2.0` | `2.8` | `3.12` | [Link](https://huggingface.co/JusteLeo/Nunchaku-Zimage-Win-Wheels/resolve/main/nunchaku-1.2.0%2Btorch2.8-cp312-cp312-win_amd64.whl) |
| `1.2.0` | `2.8` | `3.11` | [Link](https://huggingface.co/JusteLeo/Nunchaku-Zimage-Win-Wheels/resolve/main/nunchaku-1.2.0%2Btorch2.8-cp311-cp311-win_amd64.whl) |
| `1.2.0` | `2.7` | `3.13` | [Link](https://huggingface.co/JusteLeo/Nunchaku-Zimage-Win-Wheels/resolve/main/nunchaku-1.2.0%2Btorch2.7-cp313-cp313-win_amd64.whl) |
| `1.2.0` | `2.7` | `3.12` | [Link](https://huggingface.co/JusteLeo/Nunchaku-Zimage-Win-Wheels/resolve/main/nunchaku-1.2.0%2Btorch2.7-cp312-cp312-win_amd64.whl) |
| `1.2.0` | `2.7` | `3.11` | [Link](https://huggingface.co/JusteLeo/Nunchaku-Zimage-Win-Wheels/resolve/main/nunchaku-1.2.0%2Btorch2.7-cp311-cp311-win_amd64.whl) |
| `1.0.2` | `2.10` | `3.13` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.10-cp313-cp313-win_amd64.whl) |
| `1.0.2` | `2.10` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.10-cp312-cp312-win_amd64.whl) |
| `1.0.2` | `2.10` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.10-cp311-cp311-win_amd64.whl) |
| `1.0.2` | `2.10` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.10-cp310-cp310-win_amd64.whl) |
| `1.0.2` | `2.9` | `3.13` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.9-cp313-cp313-win_amd64.whl) |
| `1.0.2` | `2.9` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.9-cp312-cp312-win_amd64.whl) |
| `1.0.2` | `2.9` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.9-cp311-cp311-win_amd64.whl) |
| `1.0.2` | `2.9` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.9-cp310-cp310-win_amd64.whl) |
| `1.0.2` | `2.8` | `3.13` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.8-cp313-cp313-win_amd64.whl) |
| `1.0.2` | `2.8` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.8-cp312-cp312-win_amd64.whl) |
| `1.0.2` | `2.8` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.8-cp311-cp311-win_amd64.whl) |
| `1.0.2` | `2.8` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.8-cp310-cp310-win_amd64.whl) |
| `1.0.2` | `2.7` | `3.13` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.7-cp313-cp313-win_amd64.whl) |
| `1.0.2` | `2.7` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.7-cp312-cp312-win_amd64.whl) |
| `1.0.2` | `2.7` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.7-cp311-cp311-win_amd64.whl) |
| `1.0.2` | `2.7` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.2/nunchaku-1.0.2+torch2.7-cp310-cp310-win_amd64.whl) |
| `1.0.1` | `2.10` | `3.13` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.10-cp313-cp313-win_amd64.whl) |
| `1.0.1` | `2.10` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.10-cp312-cp312-win_amd64.whl) |
| `1.0.1` | `2.10` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.10-cp311-cp311-win_amd64.whl) |
| `1.0.1` | `2.10` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.10-cp310-cp310-win_amd64.whl) |
| `1.0.1` | `2.9` | `3.13` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/nunchaku-1.0.1%2Bcu128torch2.9-cp313-cp313-win_amd64.whl) |
| `1.0.1` | `2.9` | `3.13` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/nunchaku-1.0.1%2Bcu130torch2.9-cp313-cp313-win_amd64.whl) |
| `1.0.1` | `2.9` | `3.12` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/nunchaku-1.0.1%2Bcu128torch2.9-cp312-cp312-win_amd64.whl) |
| `1.0.1` | `2.9` | `3.12` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/nunchaku-1.0.1%2Bcu130torch2.9-cp312-cp312-win_amd64.whl) |
| `1.0.1` | `2.8` | `3.13` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.8-cp313-cp313-win_amd64.whl) |
| `1.0.1` | `2.8` | `3.13` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.8-cp313-cp313-win_amd64.whl) |
| `1.0.1` | `2.8` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.8-cp312-cp312-win_amd64.whl) |
| `1.0.1` | `2.8` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.8-cp311-cp311-win_amd64.whl) |
| `1.0.1` | `2.8` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.8-cp310-cp310-win_amd64.whl) |
| `1.0.1` | `2.7` | `3.13` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.7-cp313-cp313-win_amd64.whl) |
| `1.0.1` | `2.7` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.7-cp312-cp312-win_amd64.whl) |
| `1.0.1` | `2.7` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.7-cp311-cp311-win_amd64.whl) |
| `1.0.1` | `2.7` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.7-cp310-cp310-win_amd64.whl) |
| `1.0.1` | `2.6` | `3.13` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.6-cp313-cp313-win_amd64.whl) |
| `1.0.1` | `2.6` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.6-cp312-cp312-win_amd64.whl) |
| `1.0.1` | `2.6` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.6-cp311-cp311-win_amd64.whl) |
| `1.0.1` | `2.6` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.6-cp310-cp310-win_amd64.whl) |
| `1.0.1` | `2.5` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.5-cp312-cp312-win_amd64.whl) |
| `1.0.1` | `2.5` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.5-cp311-cp311-win_amd64.whl) |
| `1.0.1` | `2.5` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.1/nunchaku-1.0.1+torch2.5-cp310-cp310-win_amd64.whl) |
| `1.0.0` | `2.9` | `3.13` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.9-cp313-cp313-win_amd64.whl) |
| `1.0.0` | `2.9` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.9-cp312-cp312-win_amd64.whl) |
| `1.0.0` | `2.9` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.9-cp311-cp311-win_amd64.whl) |
| `1.0.0` | `2.9` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.9-cp310-cp310-win_amd64.whl) |
| `1.0.0` | `2.8` | `3.13` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.8-cp313-cp313-win_amd64.whl) |
| `1.0.0` | `2.8` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.8-cp312-cp312-win_amd64.whl) |
| `1.0.0` | `2.8` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.8-cp311-cp311-win_amd64.whl) |
| `1.0.0` | `2.8` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.8-cp310-cp310-win_amd64.whl) |
| `1.0.0` | `2.7` | `3.13` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.7-cp313-cp313-win_amd64.whl) |
| `1.0.0` | `2.7` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.7-cp312-cp312-win_amd64.whl) |
| `1.0.0` | `2.7` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.7-cp311-cp311-win_amd64.whl) |
| `1.0.0` | `2.7` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.7-cp310-cp310-win_amd64.whl) |
| `1.0.0` | `2.6` | `3.13` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.6-cp313-cp313-win_amd64.whl) |
| `1.0.0` | `2.6` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.6-cp312-cp312-win_amd64.whl) |
| `1.0.0` | `2.6` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.6-cp311-cp311-win_amd64.whl) |
| `1.0.0` | `2.6` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.6-cp310-cp310-win_amd64.whl) |
| `1.0.0` | `2.5` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.5-cp312-cp312-win_amd64.whl) |
| `1.0.0` | `2.5` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.5-cp311-cp311-win_amd64.whl) |
| `1.0.0` | `2.5` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v1.0.0/nunchaku-1.0.0+torch2.5-cp310-cp310-win_amd64.whl) |
| `0.3.2` | `2.9` | `3.12` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/nunchaku-0.3.2%2Btorch2.9-cp312-cp312-win_amd64.whl?download=true) |
| `0.3.2` | `2.8` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v0.3.2/nunchaku-0.3.2+torch2.8-cp312-cp312-win_amd64.whl) |
| `0.3.2` | `2.8` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v0.3.2/nunchaku-0.3.2+torch2.8-cp311-cp311-win_amd64.whl) |
| `0.3.2` | `2.8` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v0.3.2/nunchaku-0.3.2+torch2.8-cp310-cp310-win_amd64.whl) |
| `0.3.2` | `2.7` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v0.3.2/nunchaku-0.3.2+torch2.7-cp312-cp312-win_amd64.whl) |
| `0.3.2` | `2.7` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v0.3.2/nunchaku-0.3.2+torch2.7-cp311-cp311-win_amd64.whl) |
| `0.3.2` | `2.7` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v0.3.2/nunchaku-0.3.2+torch2.7-cp310-cp310-win_amd64.whl) |
| `0.3.2` | `2.6` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v0.3.2/nunchaku-0.3.2+torch2.6-cp312-cp312-win_amd64.whl) |
| `0.3.2` | `2.6` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v0.3.2/nunchaku-0.3.2+torch2.6-cp311-cp311-win_amd64.whl) |
| `0.3.2` | `2.6` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v0.3.2/nunchaku-0.3.2+torch2.6-cp310-cp310-win_amd64.whl) |
| `0.3.2` | `2.5` | `3.12` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v0.3.2/nunchaku-0.3.2+torch2.5-cp312-cp312-win_amd64.whl) |
| `0.3.2` | `2.5` | `3.11` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v0.3.2/nunchaku-0.3.2+torch2.5-cp311-cp311-win_amd64.whl) |
| `0.3.2` | `2.5` | `3.10` | [Link](https://github.com/nunchaku-tech/nunchaku/releases/download/v0.3.2/nunchaku-0.3.2+torch2.5-cp310-cp310-win_amd64.whl) |
<!-- END_NUNCHAKU_TABLE -->
  
<p id="natten" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 NATTEN
Neighborhood Attention Transformer.

[![GitHub](https://img.shields.io/badge/SHI--Labs-NATTEN-blue?style=flat)](https://github.com/SHI-Labs/NATTEN)
[![HuggingFace](https://img.shields.io/badge/lldacing-HF%20Wheels-orange?style=flat)](https://huggingface.co/lldacing/NATTEN-windows/tree/main)

<!-- START_NATTEN_TABLE -->
<!-- This table is auto-generated. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | CUDA Ver | Download Link |
|:---:|:---:|:---:|:---:|:---:|
| `0.17.5` | `2.7.0` | `3.12` | `12.8` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.5+torch270cu128-cp312-cp312-win_amd64.whl) |
| `0.17.5` | `2.7.0` | `3.11` | `12.8` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.5+torch270cu128-cp311-cp311-win_amd64.whl) |
| `0.17.5` | `2.7.0` | `3.10` | `12.8` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.5+torch270cu128-cp310-cp310-win_amd64.whl) |
| `0.17.5` | `2.6.0` | `3.12` | `12.6` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.5+torch260cu126-cp312-cp312-win_amd64.whl) |
| `0.17.5` | `2.6.0` | `3.11` | `12.6` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.5+torch260cu126-cp311-cp311-win_amd64.whl) |
| `0.17.5` | `2.6.0` | `3.10` | `12.6` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.5+torch260cu126-cp310-cp310-win_amd64.whl) |
| `0.17.3` | `2.5.1` | `3.12` | `12.4` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch251cu124-cp312-cp312-win_amd64.whl) |
| `0.17.3` | `2.5.1` | `3.11` | `12.4` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch251cu124-cp311-cp311-win_amd64.whl) |
| `0.17.3` | `2.5.1` | `3.10` | `12.4` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch251cu124-cp310-cp310-win_amd64.whl) |
| `0.17.3` | `2.5.0` | `3.12` | `12.4` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch250cu124-cp312-cp312-win_amd64.whl) |
| `0.17.3` | `2.5.0` | `3.11` | `12.4` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch250cu124-cp311-cp311-win_amd64.whl) |
| `0.17.3` | `2.5.0` | `3.10` | `12.4` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch250cu124-cp310-cp310-win_amd64.whl) |
| `0.17.3` | `2.4.1` | `3.12` | `12.4` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch241cu124-cp312-cp312-win_amd64.whl) |
| `0.17.3` | `2.4.1` | `3.11` | `12.4` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch241cu124-cp311-cp311-win_amd64.whl) |
| `0.17.3` | `2.4.1` | `3.10` | `12.4` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch241cu124-cp310-cp310-win_amd64.whl) |
| `0.17.3` | `2.4.0` | `3.12` | `12.4` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch240cu124-cp312-cp312-win_amd64.whl) |
| `0.17.3` | `2.4.0` | `3.11` | `12.4` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch240cu124-cp311-cp311-win_amd64.whl) |
| `0.17.3` | `2.4.0` | `3.10` | `12.4` | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch240cu124-cp310-cp310-win_amd64.whl) |
<!-- END_NATTEN_TABLE -->
<p id="triton" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 Triton (Windows Fork)
Triton is a language and compiler for writing highly efficient custom deep-learning primitives. Not officially supported on Windows, but a fork provides pre-built wheels.

[![GitHub](https://img.shields.io/badge/triton--lang-triton--windows-blue?style=flat)](https://github.com/triton-lang/triton-windows)

**Supported GPUs**:
> [!NOTE]
> Different GPU architectures require different Triton versions due to compute capability support.

| Triton Version | Supported GPUs | Compute Capability |
|:---:|:---|:---:|
| `3.6.x` | RTX 50xx (Blackwell), RTX 40xx, Ada Lovelace, Hopper | SM 8.9, 9.0, 10.0 |
| `3.5.x` | RTX 30xx, 40xx, Ada Lovelace, Hopper | SM 8.0, 8.9, 9.0 |
| `3.4.x` | RTX 20xx, 30xx, 40xx, Ada Lovelace, Hopper | SM 7.5, 8.0, 8.9, 9.0 |
| `<= 3.2.x` | GTX/RTX 16xx, RTX 20xx, 30xx, 40xx, Ada Lovelace, Hopper | SM 7.0, 7.5, 8.0, 8.9, 9.0 |

**Installation**:

| Package Version | PyTorch Ver | Compute Capability | Install |
|:---:|:---:|:---:|:---|
| `3.6.x` | >= 2.9 | SM 8.9+ | `pip install -U "triton-windows<3.7"` |
| `3.5.x` | >= 2.9 | SM 8.0+ | `pip install -U "triton-windows<3.6"` |
| `3.4.x` | >= 2.8 | SM 7.5+ | `pip install -U "triton-windows<3.5"` |

**Python libs**:
> [!IMPORTANT]
> Triton requires additional Python development libraries for building CUDA kernels. Download the package matching your Python version, extract the ZIP file, and copy the `include` and `libs` folders to your Python installation directory.

| Python Ver | Download |
|:---:|:---:|
| `3.13` | [Link](https://github.com/woct0rdho/triton-windows/releases/download/v3.0.0-windows.post1/python_3.13.2_include_libs.zip) |
| `3.12` | [Link](https://github.com/woct0rdho/triton-windows/releases/download/v3.0.0-windows.post1/python_3.12.7_include_libs.zip) |
| `3.11` | [Link](https://github.com/woct0rdho/triton-windows/releases/download/v3.0.0-windows.post1/python_3.11.9_include_libs.zip) |
| `3.10` | [Link](https://github.com/woct0rdho/triton-windows/releases/download/v3.0.0-windows.post1/python_3.10.11_include_libs.zip) |
| `3.9` | [Link](https://github.com/woct0rdho/triton-windows/releases/download/v3.0.0-windows.post1/python_3.9.13_include_libs.zip) |

<p id="bitsandbytes" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 bitsandbytes
A lightweight wrapper around CUDA custom functions, particularly for 8-bit optimizers, matrix multiplication (LLM.int8()), and quantization functions.

[![GitHub](https://img.shields.io/badge/bitsandbytes--foundation-bitsandbytes-blue?style=flat)](https://github.com/bitsandbytes-foundation/bitsandbytes)

<p align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 RadialAttention for ComfyUI

[![GitHub](https://img.shields.io/badge/woct0rdho-ComfyUI--RadialAttn-blue?style=flat)](https://github.com/woct0rdho/ComfyUI-RadialAttn)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<p id="spargeattn" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 SpargeAttn

[![GitHub](https://img.shields.io/badge/thu--ml-SpargeAttn-blue?style=flat)](https://github.com/thu-ml/SpargeAttn)
[![GitHub](https://img.shields.io/badge/woct0rdho-Wheels-green?style=flat)](https://github.com/woct0rdho/SpargeAttn/releases)
<!-- START_SPARGEATTN_TABLE -->
<!-- This table is auto-generated. Do not edit manually. -->
| Package Version | PyTorch Ver | CUDA Ver | Download Link |
|:---:|:---:|:---:|:---:|
| `0.1.0.post1` | `2.8.0` | `12.8` | [Link](https://github.com/woct0rdho/SpargeAttn/releases/download/v0.1.0-windows.post1/spas_sage_attn-0.1.0+cu128torch2.8.0.post1-cp39-abi3-win_amd64.whl) |
| `0.1.0.post1` | `2.7.1` | `12.8` | [Link](https://github.com/woct0rdho/SpargeAttn/releases/download/v0.1.0-windows.post1/spas_sage_attn-0.1.0+cu128torch2.7.1.post1-cp39-abi3-win_amd64.whl) |
<!-- END_SPARGEATTN_TABLE -->

<p id="block_sparse_attn" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 Block Sparse Attention

[![GitHub](https://img.shields.io/badge/mit--han--lab-Block%20Sparse-blue?style=flat)](https://github.com/mit-han-lab/Block-Sparse-Attention/)
[![HuggingFace](https://img.shields.io/badge/Wildminder-HF%20Wheels-orange?style=flat)](https://huggingface.co/Wildminder/AI-windows-whl/tree/main)
<!-- START_BLOCKSPARSEATTN_TABLE -->
<!-- This table is auto-generated. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | CUDA Ver | Download Link |
|:---:|:---:|:---:|:---:|:---:|
| `0.0.2.post1` | `2.11` | `3.13` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/block_sparse_attn-0.0.2.post1+cu130torch2.11cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
| `0.0.2.post1` | `2.10` | `3.13` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/block_sparse_attn-0.0.2.post1+cu130torch2.10cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
| `0.0.2.post1` | `2.9.1` | `3.13` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/block_sparse_attn-0.0.2.post1+cu130torch2.9.1cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
<!-- END_BLOCKSPARSEATTN_TABLE -->

<p id="deepspeed" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 DeepSpeed
* A deep learning optimization library 
* **Official Repo**: [https://github.com/deepspeedai/DeepSpeed](https://github.com/deepspeedai/DeepSpeed)
<!-- START_DEEPSPEED_TABLE -->
<!-- This table is auto-generated. Do not edit manually. -->
| Package Version | Python Ver | Download Link |
|:---:|:---:|:---:|
| `0.18.6` | `3.13` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/deepspeed/deepspeed-0.18.6+0ccb2bb6-cp313-cp313-win_amd64.whl) |
<!-- END_DEEPSPEED_TABLE -->

<p id="fairseq" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 Fairseq
* Facebook AI Research Sequence-to-Sequence Toolkit 
* **Official Repo**: [https://github.com/facebookresearch/fairseq](https://github.com/facebookresearch/fairseq)
<!-- START_FAIRSEQ_TABLE -->
<!-- This table is auto-generated. Do not edit manually. -->
| Package Version | Python Ver | Download Link |
|:---:|:---:|:---:|
| `0.12.2` | `3.13` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/fairseq/fairseq-0.12.2-cp313-cp313-win_amd64.whl) |
<!-- END_FAIRSEQ_TABLE -->

<p id="sageattn3" align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### 🛠 SageAttention 3
[![mengqin](https://github.com/mengqin/SageAttention)](https://github.com/mengqin/SageAttention)
<!-- START_SAGEATTN3_TABLE -->
<!-- This table is auto-generated. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | CUDA Ver | Download Link |
|:---:|:---:|:---:|:---:|:---:|
| `1.0.0` | `2.9.1` | `3.13` | `13.0` | [Link](https://github.com/mengqin/SageAttention/releases/download/20251229/sageattn3-1.0.0+cu130torch291-cp313-cp313-win_amd64.whl) |
| `1.0.0` | `2.9.1` | `3.12` | `13.0` | [Link](https://github.com/mengqin/SageAttention/releases/download/20251229/sageattn3-1.0.0+cu130torch291-cp312-cp312-win_amd64.whl) |
| `1.0.0` | `2.8.0` | `3.13` | `12.8` | [Link](https://github.com/mengqin/SageAttention/releases/download/20251229/sageattn3-1.0.0+cu128torch280-cp313-cp313-win_amd64.whl) |
| `1.0.0` | `2.8.0` | `3.12` | `12.8` | [Link](https://github.com/mengqin/SageAttention/releases/download/20251229/sageattn3-1.0.0+cu128torch280-cp312-cp312-win_amd64.whl) |
| `1.0.0` | `2.8.0` | `3.11` | `12.8` | [Link](https://github.com/mengqin/SageAttention/releases/download/20251229/sageattn3-1.0.0+cu128torch280-cp311-cp311-win_amd64.whl) |
| `1.0.0` | `2.7.1` | `3.13` | `12.8` | [Link](https://github.com/mengqin/SageAttention/releases/download/20251229/sageattn3-1.0.0+cu128torch271-cp313-cp313-win_amd64.whl) |
| `1.0.0` | `2.7.1` | `3.12` | `12.8` | [Link](https://github.com/mengqin/SageAttention/releases/download/20251229/sageattn3-1.0.0+cu128torch271-cp312-cp312-win_amd64.whl) |
| `1.0.0` | `2.7.1` | `3.11` | `12.8` | [Link](https://github.com/mengqin/SageAttention/releases/download/20251229/sageattn3-1.0.0+cu128torch271-cp311-cp311-win_amd64.whl) |
<!-- END_SAGEATTN3_TABLE -->




<p align="center">▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀</p>

<!-- DATA ACCESS -->
## 🌐 Accessing Data Programmatically (wheels.json)

All wheel information in this repository is managed in the `wheels.json` file, which serves as the single source of truth. The tables in this README are automatically generated from this file.

This provides a stable, structured JSON endpoint for any external tool or application that needs to access this data without parsing Markdown.

### ➤ How to Use

You can access the raw JSON file directly via the following URL:

```
https://raw.githubusercontent.com/wildminder/AI-windows-whl/main/wheels.json
```

**Example using `curl`:**
```sh
curl -L -o wheels.json https://raw.githubusercontent.com/wildminder/AI-windows-whl/main/wheels.json
```

The file contains a list of `packages`, each with its metadata and an array of `wheels`, where each wheel object contains version details and a direct download `url`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<p align="center">▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀</p>

<!-- CONTRIBUTING -->
## ➤ Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have found a new pre-built wheel or a reliable source, please fork the repo and create a pull request, or simply open an issue with the link.
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## ➤ Acknowledgments

This repository is simply a collection of links. Huge thanks to the individuals and groups who do the hard work of building and hosting these wheels for the community:


<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/YOUR_USERNAME/Windows-AI-Wheels.svg?style=for-the-badge
[contributors-url]: https://github.com/YOUR_USERNAME/Windows-AI-Wheels/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/YOUR_USERNAME/Windows-AI-Wheels.svg?style=for-the-badge
[forks-url]: https://github.com/YOUR_USERNAME/Windows-AI-Wheels/network/members
[stars-shield]: https://img.shields.io/github/stars/YOUR_USERNAME/Windows-AI-Wheels.svg?style=for-the-badge
[stars-url]: https://github.com/YOUR_USERNAME/Windows-AI-Wheels/stargazers
[issues-shield]: https://img.shields.io/github/issues/YOUR_USERNAME/Windows-AI-Wheels.svg?style=for-the-badge
[issues-url]: https://github.com/YOUR_USERNAME/Windows-AI-Wheels/issues
