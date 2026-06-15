## Introduction

Ce cours présente les principales **méthodes numériques** pour résoudre les
équations aux dérivées partielles (EDP) qui apparaissent en mécanique des
fluides et en physique. On y aborde les **différences finies**, les
**éléments finis** et les **volumes finis**.

> Ces notes sont un support vivant : elles s'enrichissent au fil des chapitres.

## 1. Différences finies

L'idée est d'approcher les dérivées par des **différences** sur une grille.
Pour une fonction $u(x)$, l'approximation centrée de la dérivée seconde s'écrit :

$$
\frac{\partial^2 u}{\partial x^2}\bigg|_{x_i} \approx
\frac{u_{i+1} - 2u_i + u_{i-1}}{\Delta x^2} + \mathcal{O}(\Delta x^2)
$$

Appliquée à l'équation de la chaleur $\partial_t u = \alpha\, \partial_{xx} u$,
on obtient un schéma explicite :

$$
u_i^{n+1} = u_i^{n} + \frac{\alpha \Delta t}{\Delta x^2}\left(u_{i+1}^n - 2u_i^n + u_{i-1}^n\right)
$$

stable sous la condition $\dfrac{\alpha \Delta t}{\Delta x^2} \le \dfrac{1}{2}$.

```python
import numpy as np

def heat_step(u, alpha, dx, dt):
    lap = (np.roll(u, -1) - 2*u + np.roll(u, 1)) / dx**2
    return u + alpha * dt * lap
```

## 2. Éléments finis

La méthode des éléments finis (FEM) part de la **formulation faible**. Pour le
problème de Poisson $-\Delta u = f$ sur $\Omega$ avec $u = 0$ sur $\partial\Omega$,
on cherche $u \in H_0^1(\Omega)$ tel que :

$$
\int_\Omega \nabla u \cdot \nabla v \, \mathrm{d}\Omega
= \int_\Omega f\, v \, \mathrm{d}\Omega
\qquad \forall\, v \in H_0^1(\Omega)
$$

On discrétise ensuite sur une base de fonctions $\{\varphi_j\}$, ce qui conduit
au système linéaire $\mathbf{K}\mathbf{u} = \mathbf{f}$ où $\mathbf{K}$ est la
**matrice de rigidité**.

## 3. Comparaison des méthodes

| Méthode            | Géométries complexes | Conservation | Mise en œuvre |
| ------------------ | :------------------: | :----------: | :-----------: |
| Différences finies |         ✗            |      ✗       |    Simple     |
| Éléments finis     |         ✓            |      ~       |   Avancée     |
| Volumes finis      |         ✓            |      ✓       |   Moyenne     |

## Pour aller plus loin

Les chapitres suivants couvriront les volumes finis, les méthodes spectrales
et les schémas pour les écoulements multiphasiques. *(à venir)*
