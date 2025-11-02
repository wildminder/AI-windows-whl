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



<!-- ABOUT THE PROJECT -->
## About The Project

This repository was created to address a common pain point for AI enthusiasts and developers on the Windows platform: **building complex Python packages from source.** Libraries like `flash-attention`, `xformers` are essential for high-performance AI tasks but often lack official pre-built wheels for Windows, forcing users into a complicated and error-prone compilation process.

The goal here is to provide a centralized, up-to-date collection of direct links to pre-compiled `.whl` files for these libraries, primarily for the **ComfyUI** community and other PyTorch users on Windows. This saves you time and lets you focus on what's important: creating amazing things with AI.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<p align="center">══════════════════════════════════</p>

Beyond the code, I believe in the power of community and continuous learning. I invite you to join the 'TokenDiff AI News' and 'TokenDiff Community Hub'

<table border="0" align="center" cellspacing="10" cellpadding="0">
  <tr>
    <td align="center" valign="top">
      <h4>TokenDiff AI News</h4>
      <a href="https://t.me/TokenDiff">
        <img width="50%" alt="tokendiff-tg-qw" src="https://github.com/user-attachments/assets/e29f6b3c-52e5-4150-8088-12163a2e1e78" />
      </a>
      <p><sub>AI for every home, creativity for every mind!</sub></p>
    </td>
    <td align="center" valign="top">
      <h4>TokenDiff Community Hub</h4>
      <a href="https://t.me/TokenDiff_hub">
        <img width="50%" alt="token_hub-tg-qr" src="https://github.com/user-attachments/assets/da544121-5f5b-4e3d-a3ef-02272535929e" />
      </a>
      <p><sub>Questions, help, and thoughtful discussion.</sub> </p>
    </td>
  </tr>
</table>

<p align="center">══════════════════════════════════</p>

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

### PyTorch
The foundation of everything. Install this first from the official source.
*   **Official Install Page**: [https://pytorch.org/get-started/locally/](https://pytorch.org/get-started/locally/)

For convenience, here are direct installation commands for specific versions on Linux/WSL with an NVIDIA GPU. For other configurations (CPU, macOS, ROCm), please use the official install page.

#### Stable Version (2.9.0)
This is the recommended version for most users.

| CUDA Version | Pip Install Command                                                                                      |
|:-------------|:---------------------------------------------------------------------------------------------------------|
| **CUDA 13.0**  | `pip install torch torchvision --index-url https://download.pytorch.org/whl/cu130` |
| **CUDA 12.8**  | `pip install torch torchvision --index-url https://download.pytorch.org/whl/cu128` |
| **CUDA 12.6**  | `pip install torch torchvision --index-url https://download.pytorch.org/whl/cu126` |

<details>
  <summary>Previous Stable Version 2.7.1, 2.8.0</summary>

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

#### Nightly Versions
Use these for access to the latest features, but expect potential instability.

**PyTorch 2.10 (Nightly)**
| CUDA Version | Pip Install Command                                                                                      |
|:-------------|:---------------------------------------------------------------------------------------------------------|
| **CUDA 13.0**  | `pip install --pre torch torchvision --index-url https://download.pytorch.org/whl/nightly/cu130` |
| **CUDA 12.8**  | `pip install --pre torch torchvision --index-url https://download.pytorch.org/whl/nightly/cu128` |
| **CUDA 12.6**  | `pip install --pre torch torchvision --index-url https://download.pytorch.org/whl/nightly/cu126` |

**Torchaudio**
<!-- START_TORCHAUDIO_TABLE -->
<!-- This table is auto-generated by a script. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | CUDA Ver | Download Link |
|:---:|:---:|:---:|:---:|:---:|
| `2.8.0a0` | `2.10.0` | `3.13` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/torchaudio-2.8.0a0+cu130torch2.10.0cxx11abi1-cp313-cp313-win_amd64.whl) |
| `2.8.0` | `2.9.0` | N/A | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/torchaudio-2.8.0a0%2Bcu128torch2.9.0cxx11abi1-cp312-cp312-win_amd64.whl?download=true) |
<!-- END_TORCHAUDIO_TABLE -->

<p align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### Flash Attention
High-performance attention implementation.
*   **Official Repo**: [Dao-AILab/flash-attention](https://github.com/Dao-AILab/flash-attention)
*   **Pre-built Sources**: [lldacing's HF](https://huggingface.co/lldacing/flash-attention-windows-wheel/tree/main), [Wildminder's HF](https://huggingface.co/Wildminder/AI-windows-whl/tree/main), [mjun0812 GitHub](https://github.com/mjun0812/flash-attention-prebuild-wheels)

<!-- START_FLASHATTENTION_TABLE -->
<!-- This table is auto-generated by a script. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | CUDA Ver | CXX11 ABI | Download Link |
|:---:|:---:|:---:|:---:|:---:|:---:|
| `2.8.3` | `2.10.0` | `3.13` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3+cu130torch2.10.0cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
| `2.8.3` | `2.10.0` | `3.12` | `13.0` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3+cu130torch2.10.0cxx11abiTRUE-cp312-cp312-win_amd64.whl) |
| `2.8.3` | `2.10.0` | `3.13` | `12.8` | ✓ | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/flash_attn-2.8.3+cu128torch2.10.0cxx11abiTRUE-cp313-cp313-win_amd64.whl) |
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
  
<p align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### xformers
Another library for memory-efficient attention and other optimizations.
*   **Official Repo**: [facebookresearch/xformers](https://github.com/facebookresearch/xformers/releases)
*   **PyTorch Pre-built Index**: [https://download.pytorch.org/whl/xformers/](https://download.pytorch.org/whl/xformers/)
> [!NOTE]
> PyTorch provides official pre-built wheels for xformers. You can often install it with `pip install xformers` if you installed PyTorch correctly. If that fails, find your matching wheel at the index link above.

ABI3 version, any Python 3.9-3.12

<!-- START_XFORMERS_TABLE -->
<!-- This table is auto-generated by a script. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | CUDA Ver | Download Link |
|:---:|:---:|:---:|:---:|:---:|
| `0.0.33` | `2.10` | `3.9` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/xformers-0.0.33%2Bcu130torch2.10-cp39-abi3-win_amd64.whl) |
| `0.0.33` | `2.9` | `3.9` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/xformers-0.0.33%2Bcu130torch2.9-cp39-abi3-win_amd64.whl) |
| `0.0.32.post2` | `2.8.0` | `3.9` | `12.9` | [Link](https://download.pytorch.org/whl/cu129/xformers-0.0.32.post2-cp39-abi3-win_amd64.whl) |
| `0.0.32.post2` | `2.8.0` | `3.9` | `12.8` | [Link](https://download.pytorch.org/whl/cu128/xformers-0.0.32.post2-cp39-abi3-win_amd64.whl) |
| `0.0.32.post2` | `2.8.0` | `3.9` | `12.6` | [Link](https://download.pytorch.org/whl/cu126/xformers-0.0.32.post2-cp39-abi3-win_amd64.whl) |
<!-- END_XFORMERS_TABLE --> 

<p align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### SageAttention
*   **Official Repo**: [thu-ml/SageAttention](https://github.com/thu-ml/SageAttention)
*   **Pre-built Sources**: [woct0rdho's Releases](https://github.com/woct0rdho/SageAttention/releases), [Wildminder's HF](https://huggingface.co/Wildminder/AI-windows-whl/tree/main)

<!-- START_SAGEATTENTION2_TABLE -->
<!-- This table is auto-generated by a script. Do not edit manually. -->
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

#### SageAttention 2.2 (SageAttention2++)
> [!NOTE]
> Only supports CUDA >= 12.8, therefore PyTorch >= 2.7.

<!-- START_SAGEATTENTION22_TABLE -->
<!-- This table is auto-generated by a script. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | CUDA Ver | Download Link |
|:---:|:---:|:---:|:---:|:---:|
| `2.2.0.post4` | `>2.9.0` | `3.9` | `13.0` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post4/sageattention-2.2.0+cu130torch2.9.0andhigher.post4-cp39-abi3-win_amd64.whl) |
| `2.2.0.post4` | `>2.9.0` | `3.9` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post4/sageattention-2.2.0+cu128torch2.9.0andhigher.post4-cp39-abi3-win_amd64.whl) |
| `2.2.0.post3` | `2.10.0` | `3.13` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu130torch2.10.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.10.0` | `3.12` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu130torch2.10.0-cp312-cp312-win_amd64.whl) |
| `2.2.0.post3` | `2.10.0` | `3.13` | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu128torch2.10.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.10.0` | `3.12` | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu128torch2.10.0-cp312-cp312-win_amd64.whl) |
| `2.2.0.post3` | `2.9.0` | `3.13` | `13.0` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu130torch2.9.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.9.0` | `3.13` | `12.9` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu129torch2.9.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.9.0` | `>3.9` | `12.9` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu129torch2.9.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.9.0` | `3.13` | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu128torch2.9.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.9.0` | `>3.9` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post3/sageattention-2.2.0+cu128torch2.9.0.post3-cp39-abi3-win_amd64.whl) |
| `2.2.0.post3` | `2.8.0` | `3.13` | `12.9` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu129torch2.8.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.8.0` | `>3.9` | `12.9` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu129torch2.8.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.8.0` | `3.13` | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0.post3+cu128torch2.8.0-cp313-cp313-win_amd64.whl) |
| `2.2.0.post3` | `2.8.0` | `>3.9` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post3/sageattention-2.2.0+cu128torch2.8.0.post3-cp39-abi3-win_amd64.whl) |
| `2.2.0.post3` | `2.7.1` | `>3.9` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post3/sageattention-2.2.0+cu128torch2.7.1.post3-cp39-abi3-win_amd64.whl) |
| `2.2.0.post3` | `2.6.0` | `>3.9` | `12.6` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post3/sageattention-2.2.0+cu126torch2.6.0.post3-cp39-abi3-win_amd64.whl) |
| `2.2.0.post3` | `2.5.1` | `>3.9` | `12.4` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post3/sageattention-2.2.0+cu124torch2.5.1.post3-cp39-abi3-win_amd64.whl) |
| `2.2.0.post2` | `2.9.0` | `>3.9` | `12.8` | [Link](https://huggingface.co/Wildminder/AI-windows-whl/resolve/main/sageattention-2.2.0%2Bcu128torch2.9.0cxx11abi1-cp312-cp312-win_amd64.whl?download=true) |
| `2.2.0.post2` | `2.8.0` | `>3.9` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post2/sageattention-2.2.0+cu128torch2.8.0.post2-cp39-abi3-win_amd64.whl) |
| `2.2.0.post2` | `2.7.1` | `>3.9` | `12.8` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post2/sageattention-2.2.0+cu128torch2.7.1.post2-cp39-abi3-win_amd64.whl) |
| `2.2.0.post2` | `2.6.0` | `>3.9` | `12.6` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post2/sageattention-2.2.0+cu126torch2.6.0.post2-cp39-abi3-win_amd64.whl) |
| `2.2.0.post2` | `2.5.1` | `>3.9` | `12.4` | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post2/sageattention-2.2.0+cu124torch2.5.1.post2-cp39-abi3-win_amd64.whl) |
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

<p align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### SpargeAttn  
*   **Official Repo**: [thu-ml/SpargeAttn](https://github.com/thu-ml/SpargeAttn)
*   **Pre-built Sources**: [woct0rdho's Releases](https://github.com/woct0rdho/SpargeAttn/releases)
<!-- START_SPARGEATTN_TABLE -->
<!-- This table is auto-generated by a script. Do not edit manually. -->
| Package Version | PyTorch Ver | CUDA Ver | Download Link |
|:---:|:---:|:---:|:---:|
| `0.1.0.post1` | `2.8.0` | `12.8` | [Link](https://github.com/woct0rdho/SpargeAttn/releases/download/v0.1.0-windows.post1/spas_sage_attn-0.1.0+cu128torch2.8.0.post1-cp39-abi3-win_amd64.whl) |
| `0.1.0.post1` | `2.7.1` | `12.8` | [Link](https://github.com/woct0rdho/SpargeAttn/releases/download/v0.1.0-windows.post1/spas_sage_attn-0.1.0+cu128torch2.7.1.post1-cp39-abi3-win_amd64.whl) |
<!-- END_SPARGEATTN_TABLE -->

<p align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### Nunchaku
*   **Official Repo**: : [mit-han-lab/nunchaku](https://github.com/mit-han-lab/nunchaku/releases)
<!-- START_NUNCHAKU_TABLE -->
<!-- This table is auto-generated by a script. Do not edit manually. -->
| Package Version | PyTorch Ver | Python Ver | Download Link |
|:---:|:---:|:---:|:---:|
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
  
<p align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### NATTEN
Neighborhood Attention Transformer.
*   **Official Repo**: [SHI-Labs/NATTEN](https://github.com/SHI-Labs/NATTEN)
*   **Pre-built Source**: [lldacing's HF](https://huggingface.co/lldacing/NATTEN-windows/tree/main)

<!-- START_NATTEN_TABLE -->
<!-- This table is auto-generated by a script. Do not edit manually. -->
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
<p align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### Triton (Windows Fork)
Triton is a language and compiler for writing highly efficient custom deep-learning primitives. Not officially supported on Windows, but a fork provides pre-built wheels.
*   **Windows Fork**: [woct0rdho/triton-windows](https://github.com/woct0rdho/triton-windows/releases)

| PyTorch Ver | Installation |
|:---:|:---:|
| `>= 2.9` | `pip install -U "triton-windows<3.6"` |
| `>= 2.8` | `pip install -U "triton-windows<3.5"` |


<p align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### bitsandbytes
A lightweight wrapper around CUDA custom functions, particularly for 8-bit optimizers, matrix multiplication (LLM.int8()), and quantization functions.
*   **Official Repo**: [bitsandbytes-foundation/bitsandbytes](https://github.com/bitsandbytes-foundation/bitsandbytes)

<p align="center">▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲▼▲</p>

### RadialAttention for ComfyUI
*   **Nodes**: [ComfyUI-RadialAttn](https://github.com/woct0rdho/ComfyUI-RadialAttn)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<p align="center">▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀</p>

<!-- DATA ACCESS -->
## Accessing Data Programmatically (wheels.json)

All wheel information in this repository is managed in the `wheels.json` file, which serves as the single source of truth. The tables in this README are automatically generated from this file.

This provides a stable, structured JSON endpoint for any external tool or application that needs to access this data without parsing Markdown.

### How to Use

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
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have found a new pre-built wheel or a reliable source, please fork the repo and create a pull request, or simply open an issue with the link.
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

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


