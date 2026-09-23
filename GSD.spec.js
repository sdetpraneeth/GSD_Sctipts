import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

    await page.goto('https://qa-gsd.innovasolutions.com/login');
    await page.getByRole('button', { name: 'Login with SSO' }).click();
    await page.waitForTimeout(60000); // login manually 

    //await expect(page.locator('app-header')).toHaveText('Global Solutions Delivery', { timeout: 60000 });

    //await expect(page.locator('app-header')).toBeVisible({ timeout: 60000 }); // Wait for the header to be visible after login

    await expect(page.locator('app-header')).toContainText('Global Solutions Delivery');
    await expect(page.locator('app-profile-card')).toContainText('Upload Photo');
    await page.getByText('editUpload Photo').click();

    await expect(page.locator('app-profile-photo-dialog')).toContainText('Supported Formats: png, jpg, jpeg - upto 2MB');
    await expect(page.getByRole('heading')).toContainText('Profile Photo Upload');

    await page.locator('//input[@type=\'file\']').nth(1).setInputFiles('C:\\Users\\praneeth.elapavanam\\Downloads\\wdio.png');
    const toastAlert = page.getByRole('alert');
    await expect(toastAlert).toBeVisible();
    await expect(toastAlert).toContainText('Photo uploaded successfully');
    await expect(toastAlert).toBeHidden({ timeout: 7000 });

    await expect(page.locator('div.photo-overlay.ng-tns-c1715142850-7')). toHaveScreenshot('C:\\Users\\praneeth.elapavanam\\OneDrive - InnovaSolutions\\Pictures\\Screenshots\\Screenshot 2026-09-08 142948.png', { maxDiffPixelRatio: 0.8 });

    await expect(page.locator('app-profile-card')).toContainText('Update Photo');
    await page.getByText('editUpdate Photo').click();
    await expect(page.getByRole('heading')).toContainText('Profile Photo Upload');

    await expect(page.locator('app-profile-photo-dialog')).toContainText('Update Photo');

    await page.locator('#mat-mdc-dialog-1 input[type="file"]').setInputFiles('C:\\Users\\praneeth.elapavanam\\Downloads\\shared image.jpg');
    await expect(toastAlert).toBeVisible();
    await expect(toastAlert).toContainText('Photo updated successfully');
    await expect(toastAlert).toBeHidden({ timeout: 7000 });
    await expect(page.locator('div.photo-overlay.ng-tns-c1715142850-7')).toHaveScreenshot('C:\Users\praneeth.elapavanam\OneDrive - InnovaSolutions\Pictures\Screenshots\Screenshot 2026-09-08 155021.png', { maxDiffPixelRatio: 0.5 });
    await page.getByText('Update Photo').click();
    const deleteButton = page.locator('mat-icon.delete-icon', { hasText: 'cancel' });
    await expect(deleteButton).toHaveAttribute('mattooltip', 'Delete Photo');
    await page.getByText('cancel').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('alert', { name: 'Photo deleted successfully' }).click();
    await expect(toastAlert).toBeHidden({ timeout: 7000 });
    await page.getByText('editUpload Photo').click();
    await page.locator('//input[@type=\'file\']').nth(1).setInputFiles('C:\\Users\\praneeth.elapavanam\\Downloads\\mxj_files-seagull-27431_512.gif');
    await expect(toastAlert).toContainText('Only PNG, JPG and JPEG files are allowed.');
    await expect(toastAlert).toBeHidden({ timeout: 7000 });
    await page.locator('//input[@type=\'file\']').nth(1).setInputFiles('C:\\Users\\praneeth.elapavanam\\Downloads\\sample_5184×3456.jpeg');
    await expect(toastAlert).toContainText('File size exceeds the 2 MB limit. Please upload a smaller file.');
    await expect(toastAlert).toBeHidden({ timeout: 7000 });
    await page.locator('mat-icon', { hasText: 'close' }).click();

    const fs = require('fs');

    const downloadPromise = page.waitForEvent('download');
    await page.locator('a.download-template').click();
    const download = await downloadPromise;

    const fileName = download.suggestedFilename();
    expect(fileName).toContain('.docx');

    const savePath = `./downloads/${fileName}`;
    await download.saveAs(savePath);

    expect(fs.existsSync(savePath)).toBe(true);

    await page.locator('input[type="file"]').last().setInputFiles('C:\\Users\\praneeth.elapavanam\\Downloads\\Innova Format -Template (1).docx');
    await expect(toastAlert).toContainText('Resume updated successfully');
    await expect(toastAlert).toBeHidden({ timeout: 7000 });

    // uploaded file more than 2MB
    await page.locator('input[type="file"]').last().setInputFiles('C:\\Users\\praneeth.elapavanam\\Downloads\\sample_over_2MB.docx');
    await expect(toastAlert).toContainText('Maximum file size is 2MB');
    await expect(toastAlert).toBeHidden({ timeout: 7000 });

    // uploaded file with invalid format
    await page.locator('input[type="file"]').last().setInputFiles('C:\\Users\\praneeth.elapavanam\\Downloads\\RDInstallmentReport09-09-2026.pdf');
    await expect(toastAlert).toContainText('Only DOC/DOCX files are allowed');
    await expect(toastAlert).toBeHidden({ timeout: 7000 });

    // verify total years of experince 
    await page.getByText('Add your experience').click();
    await page.getByText('12').click();
    await page.getByText('9').nth(4).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(page.getByText('Total Exp: 12 Year(s) 9 Month')).toBeVisible();
    await expect(toastAlert).toContainText('Prior IT Experience Updated Successfully');
    await expect(toastAlert).toBeHidden({ timeout: 7000 });

    // skills section
    await page.getByText('Skills').click();
    await page.getByText('Add/Edit Skills').click();
    await page.getByRole('button', { name: '+ Add Skill', exact: true }).click();
    await page.getByRole('cell', { name: 'Select Skill' }).locator('svg').click();
    await page.getByRole('textbox', { name: 'Search Skill...' }).click();
    await page.getByRole('textbox', { name: 'Search Skill...' }).fill('test');
    await page.getByText('AI based Testing').click();
    await page.getByText('Select Proficiency Level').click();
    await page.getByText('- Intermediate').click();
    //await page.getByText('- Expert').first().click(); // check this 
    await page.getByPlaceholder('0').first().click();
    await page.getByPlaceholder('0').first().fill('5');
    await page.getByPlaceholder('0').nth(1).click();
    await page.getByPlaceholder('0').nth(1).fill('5');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(toastAlert).toContainText('Skill added successfully');
    await expect(toastAlert).toBeHidden({ timeout: 7000 });

    await page.getByRole('button', { name: 'Delete' }).first().click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(toastAlert).toContainText('Skill deleted successfully.');
    await expect(toastAlert).toBeHidden({ timeout: 7000 });





    await page.locator('body').click();
  await page.getByRole('button', { name: '+ Add Skill by Category' }).click();
  await page.getByRole('combobox', { name: 'Select Categories' }).click();
  await page.getByText('Architecture', { exact: true }).click();
  await page.keyboard.press('Escape');
  //await page.getByRole('combobox', { name: 'Select Categories' }).press('Escape');
  await page.getByRole('combobox', { name: 'Select Sub Categories' }).click();
  await page.getByText('Modeeling').click();
  await page.keyboard.press('Escape');

  await page.waitForTimeout(1000);

  //await page.getByText('Sparx').click();
// await page.locator("//span[normalize-space()='Sparx']/../mat-checkbox").check();
 //await page.locator('div').filter({ hasText: 'Sparx' }).nth(5).locator('mat-checkbox').click();
// await page.locator('span.skill-label').filter({ hasText: 'Sparx' }).locator('..').locator('mat-checkbox').click();
await page.locator('div.skill-row').filter({ hasText: 'Sparx' }).locator('input[type="checkbox"]').check();
 


 

  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('combobox', { name: 'Select Proficiency Level' }).click();
  await page.getByText('1 - Beginner 2 - Elementary 3').click();
  await page.getByRole('spinbutton', { name: '0' }).first().click();
  await page.getByRole('spinbutton', { name: '0' }).first().fill('5');
  await page.getByLabel('', { exact: true }).check();
  await page.getByRole('button', { name: 'Save' }).click();  
  await expect(toastAlert).toContainText('Skills saved successfully');
    await expect(toastAlert).toBeHidden({ timeout: 7000 });

  await page.getByRole('button', { name: 'Delete' }).first().click();
  await page.getByRole('button', { name: 'Delete' }).click();
      await expect(toastAlert).toContainText('Skill deleted successfully.');
    await expect(toastAlert).toBeHidden({ timeout: 7000 });


  await page.getByRole('button', { name: 'headset_mic' }).click();
  await page.getByRole('textbox', { name: 'Subject' }).click();
  await page.getByRole('textbox', { name: 'Subject' }).fill('Test ');
  await page.getByRole('textbox', { name: 'Comments info' }).click();
  await page.getByRole('textbox', { name: 'Comments info' }).fill('Test email');
 
  await page.locator('#file').setInputFiles('C:\\Users\\praneeth.elapavanam\\Downloads\\wdio.png');
  await page.getByRole('button', { name: 'Submit' }).click();
     await expect(toastAlert).toContainText('Thanks for your feedback. The GSD Support team will contact you soon.');
    await expect(toastAlert).toBeHidden({ timeout: 7000 });
});


    // add skill by catergory and delete them 
   /*await page.getByRole('button', { name: '+ Add Skill by Category' }).click();
  await page.getByRole('combobox', { name: 'Select Categories' }).click();
  await page.getByText('AI / Generative AI Engineering ').check();
  //await page.getByRole('combobox', { name: 'Select Categories' }).press('Escape');
  await page.getByRole('combobox', { name: 'Select Sub Categories' }).click();
  await page.getByText('Vector Databases ').check();
  await page.keyboard.press('Escape');
  await page.getByText('ChromaDB', { exact: true }).check();
  await page.getByRole('button', { name: 'Next' }).click();*/


























