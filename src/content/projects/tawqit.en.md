*Linking the sky to prayer: such is the aim of a discreet yet remarkably deep
science.* Determining prayer times sits at the crossroads of **theology**,
**geography** and **spherical astronomy**. Known as *ʿilm al-mīqāt* or *tawqīt*,
it is defined by scholars as "the knowledge of the rules and methods for arriving
at the times of the obligatory prayers" (al-ʿAlamī, d. 1373 AH / 1953). While a
single tap on an app is enough for today's believer, these times in fact rest on
centuries of observation and mathematics.

## I. The foundations of tawqīt: legal signs and expertise

To understand this discipline, one must first grasp the central figure of the
*muwaqqit* and the nature of the **visual signs** he must interpret, before seeing
why pure calculation is not enough — the role of *Tamkīn*.

### 1. The muwaqqit versus the modern astronomer

Physical astronomy and the science of *tawqīt* share the same mathematical tools
but pursue **different ends**:

- **The astronomer** studies the heavens for physical, chemical or cosmological
  reasons. He generally does not master the legal (*sharʿī*) meaning of the
  phenomena tied to prayer, since these matters are not taught in astronomy
  curricula.
- **The *muwaqqit*** studies astronomy **solely to apply it to religious ends**.
  He has a twofold expertise: celestial mechanics *and* the legal definitions of
  the sacred texts. As prayer is a daily act, the *muwaqqitūn* tested these times
  constantly over the centuries.

This legacy is ancient: as early as the 9ᵗʰ–10ᵗʰ centuries, **al-Battānī** (d.
929) refined the eccentricity of the *solar* orbit, the obliquity of the ecliptic
and proved the law of cosines of spherical trigonometry. Scholars had a refined
toolkit — the astrolabe (*al-asṭurlāb*), the sundial and gnomon (*al-mizwala*,
*al-miqyās*), and the *azyāj* (sing. *zīj*), handbooks gathering tables of the
positions of the heavenly bodies.

### 2. The visual and legal signs

The whole computation aims to **translate into clock times** the precise light
phenomena described by the Law.

**The *Fajr ṣādiq* (true dawn).** It marks the start of the morning prayer
(*Ṣubḥ*) and of the fast. It is a **horizontal whiteness** spreading along the
eastern horizon — a definition agreed by consensus (*ijmāʿ*) — that *grows* with
time. It must not be confused with the ***Fajr kādhib*** (false dawn): a
**vertical**, conical glow that appears before true dawn and then fades.
Astronomers identify it with the **zodiacal light** (interplanetary dust
scattering sunlight along the ecliptic), best seen at low latitudes — hence its
easy observation in the Arabian Peninsula.

**The *Maghrib* (sunset).** It corresponds to the **complete disappearance of the
solar disk** — upper limb included — below the **visible horizon** in the West. In
the Shia (Jaʿfarī) tradition, an additional precaution (*iḥtiyāṭ wājib*) is to wait
until the **redness in the eastern sky**, which appears after sunset, also fades
(a depression of about 4°).

**The legal night, not the astronomical one.** The *legal night (sharʿī)* extends
from **sunset to the appearance of the *fajr ṣādiq*** (al-Nasafī, d. 710 AH) — to
be distinguished from the *astronomical night*, between dusk at 18° and
astronomical dawn at 18°. In classical jurisprudence, it is this legal night that
serves to **divide the night into portions** (third, half) to set the end of the
*ʿIshāʾ* time. *(In practical computation and at high latitudes, other methods
instead divide the astronomical night or the sunset → sunrise span — more on this
later.)*

### 3. Tamkīn (precautionary time)

The computation cannot be purely geometric. The **astronomical** time (*ḥaqīqī*,
"real"), based on a perfect Earth and a theoretical horizon, must be corrected
into **legal** time (*sharʿī*), the one matching what is **actually perceptible**
to the eye. Three main factors widen the gap: **atmospheric refraction** (which
makes the Sun appear higher than it is), the **altitude** of the observation site,
and the **radius of the solar disk**.

To absorb these gaps and remove any doubt (*shakk*) about the true entry of the
time, the *muwaqqitūn* add a safety margin, the ***Tamkīn***. Al-ʿAlamī gives the
example of Fez: about five minutes tied to altitude, plus three minutes "to remove
any doubt", i.e. **eight minutes** — a delay he holds to be **obligatory**. It is
this correction that takes us from the astronomer's *ḥaqīqī time* to the *sharʿī
time* of the prayer calendar.

## The Tawqit app

It is within this legacy that **Tawqit**, the mobile and web app I built, takes
its place. Rather than relying on pre-computed tables, it **computes the Sun's
position** in real time — declination, equation of time, hour angle — to
determine prayer times anywhere on Earth, from latitude, longitude and the chosen
**depression angle** for *Fajr* and *ʿIshāʾ*. It offers several calculation
conventions, an adjustable *Tamkīn* and manual corrections — reproducing, in
code, the work of the *muwaqqitūn*: translating the signs of the sky into times.

*Available on the App Store and Google Play (links at the bottom of the page).*

## References

- Al-Bīrūnī, *al-Qānūn al-Masʿūdī*.
- Naṣīr al-Dīn al-Ṭūsī, treatises on spherical astronomy.
- Al-Nasafī, *Kanz al-Daqāʾiq* (definitions of sunset and legal night).
- Al-ʿAlamī, *Ḥāshiya ʿalā sharḥ al-Fashtālī* (on *Tamkīn*).
- Al-Burzulī, *Jāmiʿ masāʾil al-aḥkām* (instruments of *mīqāt*).
- S. Acaroğlu, *The Calculation of Islamic Prayer Times*, PhD thesis, Humboldt-Universität zu Berlin.
- *Definition & Calculation of Prayer Timings* (refraction and dawn signs).
- *Prayer Times Calculation* (calculation conventions; Jaʿfarī position).
- G. G. Bennett, "The Calculation of Astronomical Refraction in Marine Navigation", *Journal of Navigation*, **35** (1982).
- J. Meeus, *Astronomical Algorithms*, Willmann-Bell, 1998.
- W. M. Smart, *Textbook on Spherical Astronomy*, Cambridge University Press.
