## Introduction

This course introduces the main **numerical methods** used to solve the partial
differential equations (PDEs) arising in fluid mechanics and physics. It covers
**finite differences**, **finite elements** and **finite volumes**.

> These notes are a living document: they grow chapter by chapter.

## 1. Finite differences

The idea is to approximate derivatives by **differences** on a grid. For a
function $u(x)$, the centered approximation of the second derivative reads:

$$
\frac{\partial^2 u}{\partial x^2}\bigg|_{x_i} \approx
\frac{u_{i+1} - 2u_i + u_{i-1}}{\Delta x^2} + \mathcal{O}(\Delta x^2)
$$

Applied to the heat equation $\partial_t u = \alpha\, \partial_{xx} u$, this
gives an explicit scheme:

$$
u_i^{n+1} = u_i^{n} + \frac{\alpha \Delta t}{\Delta x^2}\left(u_{i+1}^n - 2u_i^n + u_{i-1}^n\right)
$$

stable under the condition $\dfrac{\alpha \Delta t}{\Delta x^2} \le \dfrac{1}{2}$.

```python
import numpy as np

def heat_step(u, alpha, dx, dt):
    lap = (np.roll(u, -1) - 2*u + np.roll(u, 1)) / dx**2
    return u + alpha * dt * lap
```

## 2. Finite elements

The finite element method (FEM) starts from the **weak formulation**. For the
Poisson problem $-\Delta u = f$ on $\Omega$ with $u = 0$ on $\partial\Omega$, we
look for $u \in H_0^1(\Omega)$ such that:

$$
\int_\Omega \nabla u \cdot \nabla v \, \mathrm{d}\Omega
= \int_\Omega f\, v \, \mathrm{d}\Omega
\qquad \forall\, v \in H_0^1(\Omega)
$$

Discretizing over a basis of functions $\{\varphi_j\}$ leads to the linear
system $\mathbf{K}\mathbf{u} = \mathbf{f}$, where $\mathbf{K}$ is the
**stiffness matrix**.

## 3. Comparing the methods

| Method             | Complex geometries | Conservation | Implementation |
| ------------------ | :----------------: | :----------: | :------------: |
| Finite differences |         ✗          |      ✗       |     Simple     |
| Finite elements    |         ✓          |      ~       |    Advanced    |
| Finite volumes     |         ✓          |      ✓       |    Medium      |

## Going further

Upcoming chapters will cover finite volumes, spectral methods and schemes for
multiphase flows. *(coming soon)*
