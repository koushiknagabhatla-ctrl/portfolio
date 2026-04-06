import re

with open(r'C:\Users\koush\OneDrive\Desktop\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

target1 = '<div class="cert-grid">\n      <div class="cert-card sl">'
rep1 = '<div class="cert-grid">\n      <a href="file:///C:/Users/koush/OneDrive/Desktop/certificates/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_69c1fcb5e876c7ec510d4ebd_1774349183450_completion_certificate.pdf" target="_blank" class="cert-link">\n      <div class="cert-card sl">'
content = content.replace(target1, rep1)

target2 = '      <div class="cert-card sr">'
rep2 = '      </a>\n      <a href="file:///C:/Users/koush/OneDrive/Desktop/certificates/N65hfzBKXRiATv6yd_Zbnc2o4ok6kD2NEXx_69c1fcb5e876c7ec510d4ebd_1774548476044_completion_certificate.pdf" target="_blank" class="cert-link">\n      <div class="cert-card sr">'
content = content.replace(target2, rep2)

# Add "View Certificate" label directly to the cards since we aren't using the full chunk replacement
content = content.replace('<div class="cert-badge"><span class="gdot"></span> Verified</div>', '<div class="cert-badge"><span class="gdot"></span> Verified</div>\n        <div class="p-link" style="margin-top:14px;">View Certificate <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>')

# Use regex to strip out the cert-img-wrap which contains a massive base64 string
content = re.sub(r'  <div class="cert-img-wrap sv d2">.*?</section>', '      </a>\n    </div>\n  </div>\n</section>', content, flags=re.DOTALL)

with open(r'C:\Users\koush\OneDrive\Desktop\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML modified")
