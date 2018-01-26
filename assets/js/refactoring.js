            // get contens of iframe
            const contentFrame = jQuery('iframe#cblt_content').contents();
            let siteEditorIframe = contentFrame.find('iframe#siteEditorIframe').contents();
            viewerIframe = siteEditorIframe.find('iframe#viewer').contents();


            setInterval(function () {
                document.getElementByID('body').classList.toggle('hide');
            }, 1000);

document.getElementById
