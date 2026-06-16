import math, os
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Arc, Wedge

OUT = os.path.expanduser("~/Projects/ilies-haouche/public/tawqit")
TEAL,AMBER,RED,SLATE,GOLD = "#0e7490","#b45309","#b91c1c","#334155","#f59e0b"
NIGHT,SKY = "#1e293b","#dbeafe"
plt.rcParams.update({"font.family":"serif","mathtext.fontset":"stix","savefig.dpi":42,"savefig.bbox":"tight"})

def sun_marker(ax, x, y, r=0.05, c=GOLD):
    ax.add_patch(plt.Circle((x,y), r, color=c, zorder=7, ec="#b45309", lw=2))
    for k in range(8):
        a=k*math.pi/4
        ax.plot([x+r*1.3*math.cos(a), x+r*2.1*math.cos(a)],
                [y+r*1.3*math.sin(a), y+r*2.1*math.sin(a)], color=c, lw=3, zorder=7)

T = {
 "fr": dict(hor="horizon", E="Est", O="Ouest",
   names=["Fajr","Chourouq","Dhohr","Asr","Maghrib","Icha"], mer="(méridien)",
   fajr="Fajr\n(aube vraie)", isha="Icha\n(fin du crépuscule)",
   absurd="12° et 15° : trop faibles\n(le ciel n'est pas encore noir)"),
 "en": dict(hor="horizon", E="East", O="West",
   names=["Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"], mer="(meridian)",
   fajr="Fajr\n(true dawn)", isha="Isha\n(end of twilight)",
   absurd="12° and 15°: too shallow\n(sky not yet dark)"),
}

for lang,t in T.items():
    # ---------- Schéma 0 : dôme céleste & positions des prières ----------
    fig, ax = plt.subplots(figsize=(26,16)); ax.set_aspect("equal"); ax.axis("off")
    ax.add_patch(Wedge((0,0),1.0,0,180, color=SKY, zorder=0))
    ax.add_patch(Wedge((0,0),1.0,180,360, color=NIGHT, alpha=0.10, zorder=0))
    ax.add_patch(plt.Circle((0,0),1.0, fill=False, ec=SLATE, lw=6, zorder=2))
    ax.plot([-1.15,1.15],[0,0], color=SLATE, lw=7, zorder=3)
    ax.text(1.30,0,t["E"], fontsize=48, va="center", ha="center")
    ax.text(-1.30,0,t["O"], fontsize=48, va="center", ha="center")
    ax.text(0.0,0.07,t["hor"], fontsize=36, color=SLATE, ha="center")
    ax.add_patch(Arc((0,0),2,2,angle=0,theta1=10,theta2=170, color=AMBER, lw=4, ls=(0,(6,6)), zorder=2))
    # (altitude, côté, offset_label) : E=droite, O=gauche, mer=haut
    P=[(-18,"E"),(0,"E"),(90,"mer"),(38,"O"),(0,"O"),(-18,"O")]
    cols=["#7c3aed",AMBER,RED,"#15803d","#1d4ed8",SLATE]
    for (alt,side),name,c in zip(P,t["names"],cols):
        a=math.radians(alt)
        if side=="E":   x,y=0.97*math.cos(a),0.97*math.sin(a)
        elif side=="O": x,y=-0.97*math.cos(a),0.97*math.sin(a)
        else:           x,y=0.0,0.97
        sun_marker(ax,x,y)
        if side=="mer":
            ax.text(0,1.16,f"{name} {t['mer']}", fontsize=36, ha="center", va="bottom", color=c, fontweight="bold")
        else:
            lab=fr"$h={alt}^\circ$"
            dx=0.16 if x>=0 else -0.16; ha="left" if x>=0 else "right"
            dy = 0.16 if alt==0 else (-0.10 if alt<0 else 0.10)
            ax.text(x+dx, y+dy, f"{name}\n{lab}", fontsize=33, ha=ha, va="center", color=c, fontweight="bold")
    ax.set_xlim(-1.75,1.75); ax.set_ylim(-0.7,1.45)
    fig.savefig(f"{OUT}/dome_prieres_{lang}.png"); plt.close(fig)

    # ---------- Schéma 6 : angle de dépression (Fajr à l'Est, Icha à l'Ouest) ----------
    fig, ax = plt.subplots(figsize=(26,15)); ax.set_aspect("equal"); ax.axis("off")
    ax.add_patch(Wedge((0,0),1.25,180,360, color=NIGHT, alpha=0.06, zorder=0))
    ax.plot([-1.32,1.32],[0,0], color=SLATE, lw=8, zorder=3)
    ax.text(0,0.05,t["hor"], fontsize=40, ha="center", color=SLATE, va="bottom")
    ax.plot(0,0, marker="o", ms=20, color="k", zorder=6)
    specs=[(12,RED,0.50),(15,AMBER,0.74),(18,TEAL,1.05)]  # (angle, couleur, rayon de l'arc/label)
    for side in ("E","O"):
        s=1 if side=="E" else -1
        for ang,col,rr in specs:
            a=math.radians(ang)
            xe,ye=s*1.20*math.cos(a),-1.20*math.sin(a)
            ax.plot([0,xe],[0,ye], color=col, lw=10 if ang==18 else 6, zorder=4,
                    ls="-" if ang==18 else (0,(4,4)))
            # arc + label (côté Est seulement pour ne pas surcharger)
            if side=="E":
                ax.add_patch(Arc((0,0),2*rr,2*rr,angle=0,theta1=-ang,theta2=0,color=col,lw=5,zorder=4))
                xl,yl=rr*math.cos(a/2*math.pi/math.pi)*1.0, -rr*math.sin(math.radians(ang/2))
                ax.text(rr*math.cos(math.radians(ang))+0.06, -rr*math.sin(math.radians(ang)),
                        f"{ang}°", color=col, fontsize=36, ha="left", va="center", fontweight="bold")
        # Soleil au bout du rayon 18°
        a18=math.radians(18); xs,ys=s*1.20*math.cos(a18),-1.20*math.sin(a18)
        sun_marker(ax,xs,ys,r=0.045,c=TEAL)
    ax.text(1.24,-1.20*math.sin(math.radians(18))-0.02, t["fajr"], color=TEAL, fontsize=34, ha="center", va="top", fontweight="bold")
    ax.text(-1.24,-1.20*math.sin(math.radians(18))-0.02, t["isha"], color=TEAL, fontsize=34, ha="center", va="top", fontweight="bold")
    ax.text(0.0,-0.86, t["absurd"], color=RED, fontsize=30, ha="center", va="top")
    ax.text(1.16,0.12,t["E"], fontsize=42, ha="center"); ax.text(-1.16,0.12,t["O"], fontsize=42, ha="center")
    ax.set_xlim(-1.75,1.75); ax.set_ylim(-1.15,0.4)
    fig.savefig(f"{OUT}/angle_depression_{lang}.png"); plt.close(fig)

print("Schémas OK")
