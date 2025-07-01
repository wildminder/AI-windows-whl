<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Windows AI Wheels</h1>

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


<!-- GETTING STARTED -->
## Getting Started

Follow these simple steps to use the wheels from this repository.

### Prerequisites

1.  **Python for Windows**: Ensure you have a compatible Python version installed (PyTorch currently supports **Python 3.9 - 3.12** on Windows). You can get it from the [official Python website](https://www.python.org/downloads/windows/).


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

### Flash Attention
High-performance attention implementation.
*   **Official Repo**: [Dao-AILab/flash-attention](https://github.com/Dao-AILab/flash-attention)
*   **Pre-built Sources**: [lldacing's HF](https://huggingface.co/lldacing/flash-attention-windows-wheel/tree/main), [Wildminder's HF](https://huggingface.co/Wildminder/AI-windows-whl/tree/main)

  | Package Version | PyTorch Ver | Python Ver | CUDA Ver | CXX11 ABI | Download Link |
  |---|---|---|---|---|---|
  | `2.7.0.post2` | 2.4.0 | 3.10 | 12.4 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.0.post2+cu124torch2.4.0cxx11abiFALSE-cp310-cp310-win_amd64.whl) |
  | `2.7.0.post2` | 2.4.0 | 3.11 | 12.4 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.0.post2+cu124torch2.4.0cxx11abiFALSE-cp311-cp311-win_amd64.whl) |
  | `2.7.0.post2` | 2.4.0 | 3.12 | 12.4 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.0.post2+cu124torch2.4.0cxx11abiFALSE-cp312-cp312-win_amd64.whl) |
  | `2.7.0.post2` | 2.4.1 | 3.10 | 12.4 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.0.post2+cu124torch2.4.1cxx11abiFALSE-cp310-cp310-win_amd64.whl) |
  | `2.7.0.post2` | 2.4.1 | 3.11 | 12.4 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.0.post2+cu124torch2.4.1cxx11abiFALSE-cp311-cp311-win_amd64.whl) |
  | `2.7.0.post2` | 2.4.1 | 3.12 | 12.4 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.0.post2+cu124torch2.4.1cxx11abiFALSE-cp312-cp312-win_amd64.whl) |
  | `2.7.0.post2` | 2.5.0 | 3.11 | 12.4 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.0.post2+cu124torch2.5.0cxx11abiFALSE-cp311-cp311-win_amd64.whl) |
  | `2.7.0.post2` | 2.5.0 | 3.12 | 12.4 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.0.post2+cu124torch2.5.0cxx11abiFALSE-cp312-cp312-win_amd64.whl) |
  | `2.7.0.post2` | 2.5.1 | 3.11 | 12.4 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.0.post2+cu124torch2.5.1cxx11abiFALSE-cp311-cp311-win_amd64.whl) |
  | `2.7.0.post2` | 2.5.1 | 3.12 | 12.4 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.0.post2+cu124torch2.5.1cxx11abiFALSE-cp312-cp312-win_amd64.whl) |
  | `2.7.4` | 2.6.0 | 3.10 | 12.4 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.4+cu124torch2.6.0cxx11abiFALSE-cp310-cp310-win_amd64.whl) |
  | `2.7.4` | 2.6.0 | 3.11 | 12.4 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.4+cu124torch2.6.0cxx11abiFALSE-cp311-cp311-win_amd64.whl) |
  | `2.7.4` | 2.6.0 | 3.12 | 12.4 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.4+cu124torch2.6.0cxx11abiFALSE-cp312-cp312-win_amd64.whl) |
  | `2.7.4` | 2.6.0 | 3.10 | 12.6 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.4+cu126torch2.6.0cxx11abiFALSE-cp310-cp310-win_amd64.whl) |
  | `2.7.4` | 2.6.0 | 3.11 | 12.6 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.4+cu126torch2.6.0cxx11abiFALSE-cp311-cp311-win_amd64.whl) |
  | `2.7.4` | 2.6.0 | 3.12 | 12.6 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.4+cu126torch2.6.0cxx11abiFALSE-cp312-cp312-win_amd64.whl) |
  | `2.7.4.post1` | 2.7.0 | 3.10 | 12.8 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.4.post1+cu128torch2.7.0cxx11abiFALSE-cp310-cp310-win_amd64.whl) |
  | `2.7.4.post1` | 2.7.0 | 3.11 | 12.8 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.4.post1+cu128torch2.7.0cxx11abiFALSE-cp311-cp311-win_amd64.whl) |
  | `2.7.4.post1` | 2.7.0 | 3.12 | 12.8 | FALSE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.4.post1+cu128torch2.7.0cxx11abiFALSE-cp312-cp312-win_amd64.whl) |
  | `2.7.4.post1` | 2.8.0 | 3.10 | 12.8 | TRUE | [Link](https://huggingface.co/lldacing/flash-attention-windows-wheel/blob/main/flash_attn-2.7.4.post1+cu128torch2.8.0cxx11abiTRUE-cp310-cp310-win_amd64.whl) |
  | `2.7.4.post1` | 2.8.0 | 3.12 | 12.8 | TRUE | [Link](https://huggingface.co/Wildminder/AI-windows-whl/blob/main/flash_attn-2.7.4.post1+cu128torch2.8.0cxx11abiTRUE-cp312-cp312-win_amd64.whl) |
  | `2.8.0.post2` | 2.8.0 | 3.12 | 12.8 | TRUE | [Link](https://huggingface.co/Wildminder/AI-windows-whl/blob/main/flash_attn-2.8.0.post2+cu128torch2.8.0cxx11abiTRUE-cp312-cp312-win_amd64.whl) |


### xformers
Another library for memory-efficient attention and other optimizations.
*   **Official Repo**: [facebookresearch/xformers](https://github.com/facebookresearch/xformers/releases)
*   **PyTorch Pre-built Index**: [https://download.pytorch.org/whl/xformers/](https://download.pytorch.org/whl/xformers/)
> [!NOTE]
> PyTorch provides official pre-built wheels for xformers. You can often install it with `pip install xformers` if you installed PyTorch correctly. If that fails, find your matching wheel at the index link above.

### SageAttention
*   **Official Repo**: [thu-ml/SageAttention](https://github.com/thu-ml/SageAttention)
*   **Pre-built Sources**: [woct0rdho's Releases](https://github.com/woct0rdho/SageAttention/releases), [Wildminder's HF](https://huggingface.co/Wildminder/AI-windows-whl/tree/main)

  | Package Version | PyTorch Ver | Python Ver | CUDA Ver | Download Link |
  |---|---|---|---|---|
  | `2.1.1` | 2.5.1 | 3.9 | 12.4 | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu124torch2.5.1-cp39-cp39-win_amd64.whl) |
  | `2.1.1` | 2.5.1 | 3.10 | 12.4 | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu124torch2.5.1-cp310-cp310-win_amd64.whl) |
  | `2.1.1` | 2.5.1 | 3.11 | 12.4 | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu124torch2.5.1-cp311-cp311-win_amd64.whl) |
  | `2.1.1` | 2.5.1 | 3.12 | 12.4 | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu124torch2.5.1-cp312-cp312-win_amd64.whl) |
  | `2.1.1` | 2.6.0 | 3.9 | 12.6 | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu126torch2.6.0-cp39-cp39-win_amd64.whl) |
  | `2.1.1` | 2.6.0 | 3.10 | 12.6 | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu126torch2.6.0-cp310-cp310-win_amd64.whl) |
  | `2.1.1` | 2.6.0 | 3.11 | 12.6 | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu126torch2.6.0-cp311-cp311-win_amd64.whl) |
  | `2.1.1` | 2.6.0 | 3.12 | 12.6 | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu126torch2.6.0-cp312-cp312-win_amd64.whl) |
  | `2.1.1` | 2.6.0 | 3.12 | 12.6 | [Link](https://huggingface.co/Wildminder/AI-windows-whl/blob/main/sageattention-2.1.1+cu126torch2.6.0-cp312-cp312-win_amd64.whl) |
  | `2.1.1` | 2.6.0 | 3.13 | 12.6 | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu126torch2.6.0-cp313-cp313-win_amd64.whl) |
  | `2.1.1` | 2.7.0 | 3.10 | 12.8 | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu128torch2.7.0-cp310-cp310-win_amd64.whl) |
  | `2.1.1` | 2.8.0 | 3.12 | 12.8 | [Link](https://huggingface.co/Wildminder/AI-windows-whl/blob/main/sageattention-2.1.1+cu128torch2.8.0-cp312-cp312-win_amd64.whl) |

#### SageAttention 2.2 (SageAttention2++)
> [!NOTE]
> Only supports CUDA >= 12.8, therefore PyTorch >= 2.7.

  | Package Version | PyTorch Ver | Python Ver | CUDA Ver | Download Link                                                                                                                          |
  |-----------------|-------------|------------|----------|----------------------------------------------------------------------------------------------------------------------------------------|
  | `2.2.0`         | 2.7.1       | 3.9        | 12.8     | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.7.1-cp39-cp39-win_amd64.whl) |
  | `2.2.0`         | 2.7.1       | 3.10       | 12.8     | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.7.1-cp310-cp310-win_amd64.whl)|
  | `2.2.0`         | 2.7.1       | 3.11       | 12.8     | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.7.1-cp311-cp311-win_amd64.whl)|
  | `2.2.0`         | 2.7.1       | 3.12       | 12.8     | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.7.1-cp312-cp312-win_amd64.whl)|
  | `2.2.0`         | 2.7.1       | 3.13       | 12.8     | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.7.1-cp313-cp313-win_amd64.whl)|
  | `2.2.0`         | 2.8.0       | 3.9        | 12.8     | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.8.0-cp39-cp39-win_amd64.whl) |
  | `2.2.0`         | 2.8.0       | 3.10       | 12.8     | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.8.0-cp310-cp310-win_amd64.whl)|
  | `2.2.0`         | 2.8.0       | 3.11       | 12.8     | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.8.0-cp311-cp311-win_amd64.whl)|
  | `2.2.0`         | 2.8.0       | 3.12       | 12.8     | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.8.0-cp312-cp312-win_amd64.whl)|
  | `2.2.0`         | 2.8.0       | 3.13       | 12.8     | [Link](https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows/sageattention-2.2.0+cu128torch2.8.0-cp313-cp313-win_amd64.whl)|


### NATTEN
Neighborhood Attention Transformer.
*   **Official Repo**: [SHI-Labs/NATTEN](https://github.com/SHI-Labs/NATTEN)
*   **Pre-built Source**: [lldacing's HF](https://huggingface.co/lldacing/NATTEN-windows/tree/main)


  | Package Version | PyTorch Ver | Python Ver | CUDA Ver | Download Link |
  |---|---|---|---|---|
  | `0.17.3` | 2.4.0 | 3.10 | 12.4 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch240cu124-cp310-cp310-win_amd64.whl) |
  | `0.17.3` | 2.4.0 | 3.11 | 12.4 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch240cu124-cp311-cp311-win_amd64.whl) |
  | `0.17.3` | 2.4.0 | 3.12 | 12.4 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch240cu124-cp312-cp312-win_amd64.whl) |
  | `0.17.3` | 2.4.1 | 3.10 | 12.4 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch241cu124-cp310-cp310-win_amd64.whl) |
  | `0.17.3` | 2.4.1 | 3.11 | 12.4 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch241cu124-cp311-cp311-win_amd64.whl) |
  | `0.17.3` | 2.4.1 | 3.12 | 12.4 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch241cu124-cp312-cp312-win_amd64.whl) |
  | `0.17.3` | 2.5.0 | 3.10 | 12.4 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch250cu124-cp310-cp310-win_amd64.whl) |
  | `0.17.3` | 2.5.0 | 3.11 | 12.4 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch250cu124-cp311-cp311-win_amd64.whl) |
  | `0.17.3` | 2.5.0 | 3.12 | 12.4 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch250cu124-cp312-cp312-win_amd64.whl) |
  | `0.17.3` | 2.5.1 | 3.10 | 12.4 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch251cu124-cp310-cp310-win_amd64.whl) |
  | `0.17.3` | 2.5.1 | 3.11 | 12.4 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch251cu124-cp311-cp311-win_amd64.whl) |
  | `0.17.3` | 2.5.1 | 3.12 | 12.4 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.3+torch251cu124-cp312-cp312-win_amd64.whl) |
  | `0.17.5` | 2.6.0 | 3.10 | 12.6 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.5+torch260cu126-cp310-cp310-win_amd64.whl) |
  | `0.17.5` | 2.6.0 | 3.11 | 12.6 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.5+torch260cu126-cp311-cp311-win_amd64.whl) |
  | `0.17.5` | 2.6.0 | 3.12 | 12.6 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.5+torch260cu126-cp312-cp312-win_amd64.whl) |
  | `0.17.5` | 2.7.0 | 3.10 | 12.8 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.5+torch270cu128-cp310-cp310-win_amd64.whl) |
  | `0.17.5` | 2.7.0 | 3.11 | 12.8 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.5+torch270cu128-cp311-cp311-win_amd64.whl) |
  | `0.17.5` | 2.7.0 | 3.12 | 12.8 | [Link](https://huggingface.co/lldacing/NATTEN-windows/blob/main/natten-0.17.5+torch270cu128-cp312-cp312-win_amd64.whl) |


### Triton (Windows Fork)
Triton is a language and compiler for writing highly efficient custom deep-learning primitives. Not officially supported on Windows, but a fork provides pre-built wheels.
*   **Windows Fork**: [woct0rdho/triton-windows](https://github.com/woct0rdho/triton-windows/releases)
*   **Installation**: `pip install -U triton-windows`

### bitsandbytes
A lightweight wrapper around CUDA custom functions, particularly for 8-bit optimizers, matrix multiplication (LLM.int8()), and quantization functions.
*   **Official Repo**: [bitsandbytes-foundation/bitsandbytes](https://github.com/bitsandbytes-foundation/bitsandbytes)
> [!WARNING]
> Windows support for bitsandbytes is still experimental. Community-provided wheels are often the only option. We will track reliable sources as they become available.

### Other Packages
*   **nunchaku**: [mit-han-lab/nunchaku](https://github.com/mit-han-lab/nunchaku/releases)
*   **SpargeAttn**: [thu-ml/SpargeAttn](https://github.com/thu-ml/SpargeAttn) - (No known pre-built wheels, requires building from source).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


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
