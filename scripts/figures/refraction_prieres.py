"""
Effet de l'ALTITUDE du lieu sur l'horaire de trois prières au fil de l'année :
Chourouq (lever), Maghrib (coucher) et ʿAṣr.

Ordonnée : heure locale ; abscisse : jour de l'année. Une courbe par altitude.
L'altitude agit via l'abaissement de l'horizon D = 0,0353·√h_alt : plus on est
haut, plus on voit loin sous l'horizon — le coucher est retardé, le lever avancé.
Pour l'ʿAṣr (heure fixée par la longueur de l'ombre, pas par l'horizon),
l'altitude n'a aucun effet : les courbes se superposent.

Pression et température fixées (1013 hPa, 15 °C) : seule l'altitude varie.
Lieu : Roubaix (50,69° N), UTC+1 sans DST.

Lancer :  python3 refraction_prieres.py
"""
import math
import numpy as np
import matplotlib.pyplot as plt

LAT, LON, TZ = 50.69, 3.18, 1.0
P, T = 1013.0, 15.0                       # pression (hPa), température (°C) fixes
ALTITUDES = [0, 1000, 2000, 4000, 8000]   # m — du niveau de la mer à l'Everest

def sun(JD):
    n   = JD - 2451545.0
    L   = (280.466 + 0.9856474*n) % 360.0
    g   = (357.528 + 0.9856003*n) % 360.0
    gr  = math.radians(g)
    lam = math.radians((L + 1.915*math.sin(gr) + 0.020*math.sin(2*gr)) % 360.0)
    eps = math.radians(23.440 - 0.0000004*n)
    alpha = math.degrees(math.atan2(math.cos(eps)*math.sin(lam), math.cos(lam))) % 360.0
    delta = math.degrees(math.asin(math.sin(eps)*math.sin(lam)))
    E   = 4.0*(((L - alpha + 180.0) % 360.0) - 180.0)
    Rs  = 1.00014 - 0.01671*math.cos(gr) - 0.00014*math.cos(2*gr)
    return delta, E, Rs

JD0 = 2451545.0
N   = np.arange(365)
dl  = np.radians(np.array([sun(JD0+i)[0] for i in N]))
E   = np.array([sun(JD0+i)[1] for i in N])
Rs  = np.array([sun(JD0+i)[2] for i in N])
phi = math.radians(LAT)
dhuhr = 12.0 + (TZ - LON/15.0) - E/60.0

def H_for(h_deg):
    c = (np.sin(np.radians(h_deg)) - math.sin(phi)*np.sin(dl)) / (math.cos(phi)*np.cos(dl))
    return np.degrees(np.arccos(np.clip(c, -1, 1)))

def horizon_alt(alt):
    """Altitude (deg) du centre du Soleil au lever/coucher légal, pour une altitude de lieu."""
    SD = 0.2666/Rs
    R  = 0.569333*(0.28*P/(T+273.0))
    D  = 0.035333*math.sqrt(alt)
    return -(SD + R - 0.0024 + D)

# ʿAṣr : altitude fixée par l'ombre (indépendante de l'altitude du lieu)
asr_alt = np.degrees(np.arctan(1.0/(1.0 + np.tan(np.abs(phi - dl)))))

def times(prayer, alt):
    if prayer == "Chourouq":
        return dhuhr - H_for(horizon_alt(alt))/15.0
    if prayer == "Maghrib":
        return dhuhr + H_for(horizon_alt(alt))/15.0
    return dhuhr + H_for(asr_alt)/15.0      # ʿAṣr (ne dépend pas de alt)

TITRES = {"Chourouq": "Chourouq (lever)", "Maghrib": "Maghrib (coucher)", "Asr": "ʿAṣr"}
COLS   = ["#01f8ec", "#22c55e", "#ffae00", "#ff5a4d", "#c300ff"]

def make(prayer, dark):
    fg = "white" if dark else "#111111"
    plt.rcParams.update({'lines.linewidth': 13, 'font.size': 120, 'font.family': 'serif',
                         'mathtext.fontset': 'stix', 'axes.labelsize': 180,
                         'text.color': fg, 'axes.labelcolor': fg,
                         'xtick.color': fg, 'ytick.color': fg, 'axes.edgecolor': fg})
    fig, ax = plt.subplots(figsize=(29, 25), constrained_layout=True)
    for sp in ax.spines.values():
        sp.set_linewidth(10)
    ax.tick_params(axis='both', length=35, width=10)

    for alt, col in zip(ALTITUDES, COLS):
        ax.plot(N, times(prayer, alt), color=col, label=f"{alt} m")

    ax.set_xlabel(r"Jours $J$")
    ax.set_ylabel(r"Heure locale")
    ax.set_xlim(0, 365)
    ax.set_title(TITRES[prayer], fontsize=150, color=fg, pad=30)
    ax.legend(loc="best", frameon=False, fontsize=70, ncol=2, title="Altitude", title_fontsize=80)
    suffix = "dark" if dark else "light"
    fig.savefig(f"../../public/tawqit/refraction_{prayer.lower()}_{suffix}.png",
                dpi=36, bbox_inches="tight", transparent=True)
    plt.close(fig)

for p in ["Chourouq", "Maghrib", "Asr"]:
    for d in (False, True):
        make(p, d)
print("6 figures refraction_{chourouq,maghrib,asr}_{light,dark}.png générées (altitude)")
