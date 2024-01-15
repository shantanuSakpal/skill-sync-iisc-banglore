from bs4 import BeautifulSoup

html_code = """
<div class="mb-4 grid h-full grid-cols-1 items-center gap-x-4 gap-y-2 rounded-lg"><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start border-primary-400 bg-primary-500  font-medium text-white transition-colors">Agriculture &amp; Environment<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all rounded-full text-white shadow-xl" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start border-primary-400 bg-primary-500  font-medium text-white transition-colors">Arts &amp; Handicraft<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all rounded-full text-white shadow-xl" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Construction &amp; Engineering<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Construction &amp; Real Estate<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Consulting &amp; Business Services<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Education<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Energy &amp; Utilities<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Entertainment<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Finance<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Food &amp; Nutrition<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">HR &amp; Recruiting<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Health &amp; Wellness<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Hospitality &amp; Travel<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Logistics &amp; Transportation<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Manufacturing &amp; Production<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Media &amp; Communications<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Other<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Public Services<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Retail &amp; FMCG<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Tech &amp; Software<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button><button name="[object Object],[object Object]" class="flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start cursor-pointer bg-white transition-colors hover:border-slate-600 hover:shadow">Telecom &amp; Networking<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="transition-all text-slate-100" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg></button></div>
"""

soup = BeautifulSoup(html_code, 'html.parser')

industry_buttons = soup.find_all('button', class_='flex items-center justify-between gap-2 rounded-md border border-gray-300 py-3 px-4 text-start')

industry_names = []

for button in industry_buttons:
    # Extract the text content of the button
    industry_name = button.get_text(strip=True)
    # Remove the SVG part from the industry name
    industry_name = industry_name.split('<svg', 1)[0]
    # Append the industry name to the list
    industry_names.append(industry_name)

print(industry_names)