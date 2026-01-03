# Car Images Directory

## Required Car Images

Add the following images to this directory (recommended size: 800x600px minimum):

### All Cars (24 images needed):
1. `toyota-camry-2022.jpg` - 2022 Toyota Camry
2. `toyota-camry-2022-side.jpg` - 2022 Toyota Camry (Side View)
3. `honda-civic-2021.jpg` - 2021 Honda Civic
4. `mazda-cx5-2023.jpg` - 2023 Mazda CX-5
5. `nissan-xtrail-2020.jpg` - 2020 Nissan X-Trail
6. `hyundai-tucson-2021.jpg` - 2021 Hyundai Tucson
7. `volkswagen-golf-gti-2019.jpg` - 2019 Volkswagen Golf GTI
8. `kia-sportage-2022.jpg` - 2022 Kia Sportage
9. `tesla-model3-2020.jpg` - 2020 Tesla Model 3
10. `bmw-3series-2021.jpg` - 2021 BMW 3 Series
11. `ford-ranger-2022.jpg` - 2022 Ford Ranger
12. `mitsubishi-outlander-2021.jpg` - 2021 Mitsubishi Outlander
13. `subaru-forester-2020.jpg` - 2020 Subaru Forester
14. `audi-a4-2019.jpg` - 2019 Audi A4
15. `hyundai-ioniq5-2023.jpg` - 2023 Hyundai IONIQ 5
16. `mercedes-cclass-2020.jpg` - 2020 Mercedes-Benz C-Class
17. `toyota-hilux-2021.jpg` - 2021 Toyota Hilux
18. `volkswagen-tiguan-2022.jpg` - 2022 Volkswagen Tiguan Allspace
19. `lexus-rx-2020.jpg` - 2020 Lexus RX
20. `peugeot-3008-2021.jpg` - 2021 Peugeot 3008
21. `mazda3-2023.jpg` - 2023 Mazda3
22. `volvo-xc60-2020.jpg` - 2020 Volvo XC60
23. `honda-hrv-2022.jpg` - 2022 Honda HR-V
24. `skoda-octavia-2021.jpg` - 2021 Skoda Octavia
25. `kia-ev6-2023.jpg` - 2023 Kia EV6

## Image Specifications:
- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 800x600 pixels or larger
- **File Size**: Keep under 500KB for best performance
- **Aspect Ratio**: 4:3 or 16:9 works best

## Quick Setup:
1. Download car images from stock photo sites (Pexels, Unsplash, Pixabay)
2. Rename them according to the list above
3. Place them in this directory
4. Run `npm run db:seed` to update the database
5. Refresh your browser

## Adding New Cars:
When adding new cars to the database:
1. Add the image file here first
2. Update `prisma/seed.ts` with the local path
3. Reseed the database

## Placeholder Image:
Consider adding a `placeholder.jpg` for missing images to avoid broken image errors.
