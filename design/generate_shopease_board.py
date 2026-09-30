from html import escape
from pathlib import Path

OUT = Path(__file__).with_name("shopease-ui-kit.svg")
parts = []

def raw(value):
    parts.append(value)

def rect(x, y, w, h, fill="#fff", r=0, stroke="none", sw=1):
    raw(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')

def text(x, y, value, size=16, color="#172554", weight=400, anchor="start", family="Inter, Arial, sans-serif"):
    raw(f'<text x="{x}" y="{y}" font-family="{family}" font-size="{size}" font-weight="{weight}" fill="{color}" text-anchor="{anchor}">{escape(value)}</text>')

def line(x1,y1,x2,y2=None,color="#e7ebf2",sw=1):
    if y2 is None:
        y2 = y1
    raw(f'<path d="M{x1} {y1}H{x2}" stroke="{color}" stroke-width="{sw}"/>')

def button(x,y,w,label,primary=True):
    rect(x,y,w,46,"#315efb" if primary else "#ffffff",12,"none" if primary else "#dfe5ef")
    text(x+w/2,y+29,label,14,"#ffffff" if primary else "#263450",650,"middle")

def pill(x,y,w,label,fill="#eef2ff",color="#315efb"):
    rect(x,y,w,28,fill,14)
    text(x+w/2,y+19,label,11,color,650,"middle")

def phone_art(x,y,w=210,h=220):
    # A crisp, editable vector product illustration.
    rect(x+43,y+4,128,206,"#111827",22)
    rect(x+49,y+10,116,194,"url(#phoneGlow)",17)
    rect(x+88,y+16,38,7,"#111827",4)
    raw(f'<circle cx="{x+107}" cy="{y+113}" r="42" fill="#ffffff" fill-opacity=".17"/><circle cx="{x+107}" cy="{y+113}" r="29" fill="#ffffff" fill-opacity=".20"/>')
    raw(f'<path d="M{x+60} {y+157} Q{x+103} {y+112} {x+154} {y+72} L{x+154} {y+193} L{x+60} {y+193}Z" fill="#ff8d6a" fill-opacity=".9"/>')

def headphones_art(x,y):
    raw(f'<path d="M{x+52} {y+110}V{y+88}a58 58 0 0 1 116 0v22" fill="none" stroke="#25345b" stroke-width="17" stroke-linecap="round"/>')
    rect(x+44,y+98,34,72,"#315efb",15)
    rect(x+143,y+98,34,72,"#315efb",15)
    rect(x+52,y+105,17,48,"#9fb3ff",8)
    rect(x+151,y+105,17,48,"#9fb3ff",8)

def card(x,y,title,price,kind="phone",badge="BESTSELLER"):
    rect(x,y,280,342,"#ffffff",18,"#e9edf4")
    rect(x+12,y+12,256,183,"#f3f6fb",14)
    pill(x+22,y+22,91,badge,"#eaf0ff","#315efb")
    if kind == "phone": phone_art(x+43,y+28,180,160)
    else: headphones_art(x+62,y+50)
    text(x+20,y+227,title,16,"#172554",650)
    text(x+20,y+251,"Electronics  ·  ★ 4.8",12,"#78849a",450)
    text(x+20,y+292,price,19,"#172554",700)
    rect(x+200,y+266,54,54,"#315efb",16)
    text(x+227,y+301,"+",26,"#fff",500,"middle")

def frame(x,y,title,tag):
    # Header outside the screen, each screen below is a real 1440×960 design frame.
    text(x,y-25,title,18,"#172554",700)
    text(x+720,y-25,tag,12,"#748198",550,"end")
    raw(f'<g transform="translate({x},{y}) scale(.5)">')
    rect(0,0,1440,960,"#f8f9fc")
    # announcement strip and shared navbar
    rect(0,0,1440,34,"#172554")
    text(720,23,"Free delivery on orders over $100  ·  Easy 30-day returns",12,"#e8edff",500,"middle")
    rect(0,34,1440,84,"#ffffff")
    raw('<path d="M88 77l13-25 13 25h-9l-4-8-4 8z" fill="#315efb"/>')
    text(124,81,"shopeEase",24,"#172554",750)
    text(437,83,"Home",15,"#315efb",650)
    text(531,83,"Products",15,"#46536d",550)
    text(646,83,"About",15,"#46536d",550)
    rect(766,54,290,46,"#f5f7fb",13)
    text(789,83,"⌕   Search products...",14,"#8b96a8",450)
    text(1121,83,"♡",25,"#34415d",400)
    text(1177,83,"♧",23,"#34415d",400)
    rect(1203,50,1,52,"#e7ebf2")
    raw('<circle cx="1250" cy="76" r="20" fill="#eef2ff"/><text x="1250" y="82" font-family="Arial" font-size="15" font-weight="700" fill="#315efb" text-anchor="middle">A</text>')
    text(1282,74,"Alex Morgan",13,"#172554",650)
    text(1282,91,"My account",11,"#78849a",450)
    line(0,118,1440,118)

def endframe():
    raw('</g>')

raw('''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="3200" height="2260" viewBox="0 0 3200 2260">
<defs><linearGradient id="phoneGlow" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b8ccff"/><stop offset="1" stop-color="#456cff"/></linearGradient><linearGradient id="heroGlow" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#172554"/><stop offset="1" stop-color="#293d80"/></linearGradient><filter id="shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#243356" flood-opacity=".09"/></filter></defs>
<rect width="3200" height="2260" fill="#f1f3f8"/>''')
text(80,76,"SHOPEASE  /  E-COMMERCE UI KIT",17,"#315efb",750)
text(80,139,"A cleaner way to shop tech.",42,"#172554",750)
text(80,177,"Desktop page designs · shared components · responsive direction",17,"#748198",450)
rect(2340,66,780,118,"#ffffff",20)
text(2380,104,"DESIGN TOKENS",12,"#748198",700)
for i,(name,color) in enumerate([("Ink","#172554"),("Action","#315efb"),("Canvas","#f8f9fc"),("Mint","#16a98a"),("Coral","#ff8067")]):
    xx=2380+i*145
    rect(xx,119,28,28,color,9,"#e7ebf2")
    text(xx+38,138,name,12,"#44516b",600)
text(80,233,"01  HOME",12,"#315efb",750)

# Home
frame(80,278,"01 · Home","1440 × 960 · Desktop")
rect(0,118,1440,470,"url(#heroGlow)",0)
pill(92,166,148,"NEW SEASON · 2026","#ffffff","#315efb")
text(92,247,"Technology that",48,"#ffffff",750)
text(92,305,"moves with you.",48,"#ffffff",750)
text(92,349,"Thoughtful picks for work, play, and everything in between.",17,"#dbe3ff",450)
button(92,390,174,"Shop the collection")
text(92,506,"Free shipping  ·  Secure checkout  ·  30-day returns",13,"#dbe3ff",500)
rect(1038,163,294,372,"#344c94",26)
phone_art(1077,185,220,320)
pill(1137,481,96,"SAVE 15%","#ffffff","#172554")
text(92,652,"Shop by category",26,"#172554",700)
text(1338,650,"Browse all  →",14,"#315efb",650,"end")
for i,(name,sub,ic) in enumerate([("Phones","Latest releases","▯"),("Audio","Hear every detail","◖"),("Wearables","Made for movement","◷"),("Accessories","Small things, big help","✳")]):
    xx=92+i*316
    rect(xx,678,292,102,"#ffffff",16,"#e9edf4")
    rect(xx+17,697,62,62,"#eef2ff",16)
    text(xx+48,738,ic,28,"#315efb",600,"middle")
    text(xx+96,722,name,16,"#172554",650)
    text(xx+96,746,sub,12,"#78849a",450)
rect(92,817,1248,74,"#ffffff",16,"#e9edf4")
text(122,862,"✓  Free delivery",14,"#172554",650)
text(443,862,"↺  Easy returns",14,"#172554",650)
text(750,862,"⌑  Secure checkout",14,"#172554",650)
text(1064,862,"✦  2-year warranty",14,"#172554",650)
endframe()

# Products
frame(1140,278,"02 · Products","1440 × 960 · Desktop")
text(92,181,"All products",32,"#172554",750)
text(92,210,"Find the right tech for your everyday.",14,"#78849a",450)
rect(92,237,1248,58,"#ffffff",14,"#e5eaf2")
text(117,273,"⌕   Search by product name, brand, or category",14,"#8b96a8",450)
pill(92,322,104,"All (128)","#172554","#ffffff")
for i,(label,w) in enumerate([("Phones · 34",133),("Audio · 28",126),("Wearables · 22",151),("Accessories · 44",165)]):
    pill(209+i*150,322,w,label,"#ffffff","#56627a")
text(92,396,"128 products",14,"#78849a",500)
text(1338,396,"Sort by   Recommended  ⌄",14,"#44516b",550,"end")
card(92,425,"iPhone 16 Pro","$999","phone","BESTSELLER")
card(390,425,"Studio Headphones","$249","audio","TOP RATED")
card(688,425,"iPhone 15","$799","phone","−20% TODAY")
card(986,425,"Everyday Earbuds","$129","audio","NEW")
text(92,808,"Showing 1–4 of 128 products",12,"#78849a",450)
for i,l in enumerate(["‹","1","2","3","…","32","›"]):
    xx=1128+i*38
    rect(xx,782,32,32,"#315efb" if l=="1" else "#ffffff",9,"#e5eaf2")
    text(xx+16,803,l,12,"#ffffff" if l=="1" else "#56627a",600,"middle")
endframe()

# Product details
frame(2200,278,"03 · Product details","1440 × 960 · Desktop")
text(92,163,"Products  /  Phones  /  iPhone 16 Pro",12,"#78849a",450)
rect(92,190,636,570,"#f1f4fa",22)
phone_art(281,246,270,440)
for i in range(4):
    rect(92+i*92,778,78,66,"#ffffff" if i else "#edf2ff",12,"#dce4f4" if i==0 else "#e9edf4",2 if i==0 else 1)
    phone_art(111+i*92,785,40,52)
pill(774,201,110,"BESTSELLER","#eaf0ff","#315efb")
text(774,263,"Apple",14,"#315efb",650)
text(774,307,"iPhone 16 Pro",34,"#172554",750)
text(774,337,"Built for Apple Intelligence.",16,"#78849a",450)
text(774,383,"★★★★★",18,"#f2a23a",700)
text(870,383,"4.9  ·  284 reviews",13,"#78849a",450)
text(774,438,"$999",30,"#172554",750)
text(884,436,"$1,099",16,"#97a1b2",450)
line(883,431,934,431,"#97a1b2",1)
text(774,483,"Choose a finish",14,"#34415d",650)
for i,c in enumerate(["#20242d","#d8d1c2","#dbe2ea","#9a4d3f"]):
    raw(f'<circle cx="{790+i*45}" cy="{520}" r="13" fill="{c}" stroke="{"#315efb" if i==0 else "#d6dce7"}" stroke-width="{3 if i==0 else 1}"/>')
text(774,567,"Storage",14,"#34415d",650)
pill(774,584,98,"128 GB","#eef2ff","#315efb")
pill(884,584,98,"256 GB","#ffffff","#56627a")
pill(994,584,98,"512 GB","#ffffff","#56627a")
button(774,635,284,"Add to cart")
button(1072,635,62,"♡",False)
text(774,714,"✓  In stock and ready to ship",13,"#16856f",600)
text(774,746,"✓  Free delivery by Thursday",13,"#78849a",500)
line(774,779,1338)
text(774,816,"Product highlights",17,"#172554",700)
text(774,849,"A18 Pro chip  ·  48 MP camera  ·  Titanium design",13,"#78849a",450)
endframe()

# Cart
frame(80,1003,"04 · Shopping cart","1440 × 960 · Desktop")
text(92,171,"Your cart",32,"#172554",750)
text(92,200,"You have 2 items in your bag",14,"#78849a",450)
text(92,254,"PRODUCT",11,"#98a1b1",700)
text(697,254,"QUANTITY",11,"#98a1b1",700,"middle")
text(966,254,"PRICE",11,"#98a1b1",700,"end")
line(92,270,990)
for yy,name,price,kind in [(292,"iPhone 16 Pro","$999","phone"),(500,"Studio Headphones","$249","audio")]:
    rect(92,yy,898,182,"#ffffff",16,"#e9edf4")
    rect(110,yy+17,145,148,"#f3f6fb",13)
    if kind=="phone": phone_art(138,yy+23,93,133)
    else: headphones_art(120,yy+36)
    text(278,yy+56,name,18,"#172554",650)
    text(278,yy+83,"Space Black  ·  256 GB" if kind=="phone" else "Midnight  ·  Wireless",13,"#78849a",450)
    text(278,yy+133,"Remove",12,"#e26559",550)
    rect(622,yy+67,110,44,"#ffffff",11,"#e5eaf2")
    text(642,yy+95,"−",18,"#78849a",500)
    text(677,yy+95,"1",14,"#172554",600,"middle")
    text(712,yy+95,"+",18,"#315efb",600,"middle")
    text(966,yy+91,price,18,"#172554",700,"end")
rect(1022,270,316,412,"#ffffff",18,"#e9edf4")
text(1048,310,"Order summary",19,"#172554",700)
line(1048,332,1312)
text(1048,370,"Subtotal",14,"#78849a",450)
text(1312,370,"$1,248",14,"#172554",600,"end")
text(1048,412,"Shipping",14,"#78849a",450)
text(1312,412,"FREE",13,"#16856f",650,"end")
text(1048,454,"Tax estimate",14,"#78849a",450)
text(1312,454,"$99.84",14,"#172554",600,"end")
line(1048,479,1312)
text(1048,516,"Total",16,"#172554",700)
text(1312,516,"$1,347.84",19,"#172554",750,"end")
button(1048,547,264,"Continue to checkout")
text(1180,636,"⌑  Secure checkout",12,"#78849a",500,"middle")
text(92,741,"Have a promo code?",14,"#44516b",600)
rect(92,759,300,48,"#ffffff",11,"#e5eaf2")
text(109,789,"Enter code",13,"#98a1b1",450)
button(405,759,98,"Apply",False)
endframe()

# Login
frame(1140,1003,"05 · Sign in","1440 × 960 · Desktop")
rect(0,118,1440,842,"#f5f7fb")
rect(92,176,1256,680,"#ffffff",24,"#e9edf4")
rect(92,176,610,680,"url(#heroGlow)",24)
text(150,262,"Good tech. Great days.",32,"#ffffff",750)
text(150,302,"Your next favorite is one click away.",15,"#dbe3ff",450)
phone_art(270,356,230,344)
text(150,789,"Curated essentials · Fair prices · Fast delivery",13,"#dbe3ff",500)
text(786,278,"Welcome back",30,"#172554",750)
text(786,312,"Sign in to continue to your account.",14,"#78849a",450)
text(786,378,"Email address",13,"#34415d",600)
rect(786,393,485,54,"#ffffff",11,"#dfe5ef")
text(806,427,"alex@example.com",14,"#98a1b1",450)
text(786,486,"Password",13,"#34415d",600)
rect(786,501,485,54,"#ffffff",11,"#dfe5ef")
text(806,535,"••••••••••",16,"#98a1b1",450)
text(1271,486,"Forgot password?",12,"#315efb",600,"end")
rect(786,580,18,18,"#ffffff",4,"#cbd3e1")
text(814,595,"Keep me signed in",12,"#59667e",450)
button(786,624,485,"Sign in")
text(1028,694,"or continue with",12,"#98a1b1",450,"middle")
button(786,715,485,"◎   Continue with Google",False)
text(1028,804,"New to shopeEase?  Create an account",13,"#59667e",500,"middle")
endframe()

# Profile
frame(2200,1003,"06 · My account","1440 × 960 · Desktop")
text(92,177,"My account",32,"#172554",750)
text(92,206,"Manage your profile and orders.",14,"#78849a",450)
rect(92,238,258,536,"#ffffff",18,"#e9edf4")
raw('<circle cx="221" cy="300" r="42" fill="#eef2ff"/><text x="221" y="309" font-family="Arial" font-size="25" font-weight="700" fill="#315efb" text-anchor="middle">A</text>')
text(221,369,"Alex Morgan",17,"#172554",700,"middle")
text(221,392,"alex@example.com",12,"#78849a",450,"middle")
line(112,421,330)
for i,(label,ico) in enumerate([("Overview","⌂"),("My orders","▤"),("Addresses","⌖"),("Account details","◎")]):
    yy=465+i*57
    if i==0: rect(109,yy-25,224,42,"#eef2ff",10)
    text(131,yy,ico,17,"#315efb",600)
    text(162,yy,label,13,"#315efb" if i==0 else "#56627a",600 if i==0 else 500)
rect(382,238,956,194,"#ffffff",18,"#e9edf4")
text(414,282,"Welcome back, Alex",22,"#172554",700)
text(414,310,"Here’s what’s happening with your account.",13,"#78849a",450)
for i,(num,label) in enumerate([("02","Orders placed"),("01","In transit"),("$248","Rewards balance")]):
    xx=414+i*286
    rect(xx,335,266,70,"#f6f8fc",12)
    text(xx+17,367,num,20,"#315efb",700)
    text(xx+82,367,label,12,"#65718a",500)
rect(382,457,956,317,"#ffffff",18,"#e9edf4")
text(414,500,"Recent orders",19,"#172554",700)
text(1304,499,"View all  →",12,"#315efb",600,"end")
line(414,518,1305)
text(414,550,"ORDER",10,"#98a1b1",700)
text(648,550,"DATE",10,"#98a1b1",700)
text(848,550,"STATUS",10,"#98a1b1",700)
text(1159,550,"TOTAL",10,"#98a1b1",700)
for i,(oid,date,status,total) in enumerate([("#SE-2048","Sep 24, 2026","Delivered","$999.00"),("#SE-2033","Sep 19, 2026","In transit","$249.00")]):
    yy=598+i*71
    line(414,yy-19,1305)
    text(414,yy,oid,13,"#315efb",650)
    text(648,yy,date,12,"#56627a",450)
    pill(848,yy-21,94,status,"#e9f7f3" if i==0 else "#fff3e6","#16856f" if i==0 else "#c47819")
    text(1159,yy,total,13,"#172554",650)
endframe()

# Mobile frame
text(80,1680,"RESPONSIVE CHECK  /  PRODUCTS",12,"#315efb",750)
text(80,1721,"Mobile · 390 × 844",18,"#172554",700)
raw('<g transform="translate(80,1750) scale(.43)">')
rect(0,0,390,844,"#f8f9fc",28,"#d7deeb",2)
rect(0,0,390,28,"#172554",28)
text(195,19,"Free shipping over $100",10,"#ffffff",500,"middle")
rect(0,28,390,66,"#ffffff")
text(20,70,"☰",22,"#34415d",500)
text(63,69,"shopeEase",21,"#172554",750)
text(334,70,"♧",23,"#315efb",500)
line(0,94,390)
text(20,132,"All products",26,"#172554",750)
text(20,154,"Find your next favorite tech.",12,"#78849a",450)
rect(20,173,350,48,"#ffffff",12,"#e5eaf2")
text(36,203,"⌕   Search products...",13,"#8b96a8",450)
pill(20,237,84,"All (128)","#172554","#ffffff")
pill(112,237,76,"Phones","#ffffff","#56627a")
pill(196,237,66,"Audio","#ffffff","#56627a")
text(20,294,"128 products",12,"#78849a",500)
text(370,294,"Sort ⌄",12,"#44516b",550,"end")
card(20,313,"iPhone 16 Pro","$999","phone","POPULAR")
endframe()

# Notes, metrics, type scale
rect(1110,1718,2010,420,"#ffffff",22)
text(1150,1766,"FOUNDATION",12,"#315efb",750)
text(1150,1812,"Color · type · spacing",25,"#172554",700)
text(1150,1854,"A calm, premium palette keeps product photography in focus.",14,"#78849a",450)
for i,(name,val,col) in enumerate([("Ink","#172554","#172554"),("Royal blue","#315EFB","#315EFB"),("Canvas","#F8F9FC","#f8f9fc"),("Mint","#16A98A","#16a98a"),("Coral","#FF8067","#ff8067")]):
    xx=1150+i*180
    rect(xx,1881,146,72,col,13,"#e7ebf2")
    text(xx,1980,name,12,"#44516b",600)
    text(xx,2000,val,11,"#8a95a7",450)
text(1150,2054,"TYPE  ·  Inter / system sans",13,"#172554",650)
text(1454,2054,"Display 48 / H1 34 / H2 26 / Body 16 / Caption 12",13,"#78849a",450)
text(1150,2095,"GRID  ·  12 columns  ·  72 px margins  ·  24 px gutters  ·  8 px spacing rhythm",13,"#44516b",550)
text(1150,2122,"MOBILE  ·  4 columns  ·  20 px margins  ·  16 px gutters  ·  tap targets 44 px minimum",13,"#44516b",550)
text(80,2208,"SHOPEASE  ·  Design handoff board  ·  Editable vector artwork for Figma",12,"#8a95a7",450)
raw('</svg>')

OUT.write_text("\n".join(parts), encoding="utf-8")
print(OUT)
