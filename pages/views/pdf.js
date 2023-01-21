import React from 'react'

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
const Pdf = () => {

    // https://drive.google.com/file/d/1uNMw2zByrJZKzpDWr0xBkv7rmMb0JQI5/view?usp=share_link
    const docs=[
        // https://docs.google.com/spreadsheets/d/1Et8LdIKPQ_-viEEQ0zMCN1I0xLEG_JiI/edit?usp=share_link&ouid=112823389318697514167&rtpof=true&sd=true

        {uri:"https://www.googleapis.com/drive/v3/files/1uNMw2zByrJZKzpDWr0xBkv7rmMb0JQI5?alt=media&key=AIzaSyCdVB-50SIiRTLwDDuwuHgtEPR-eEopMls"}
    ]
  return (
    <div>

{/* https://drive.google.com/file/d/14m0ljy_LygzSfFvx320qqAE3RneE0rtL/view?usp=share_link */}
        {/* https://drive.google.com/file/d/1zDQMBGe-kzgApt0Rwv7YbPWbW7bfxHHp/view?usp=share_link */}
        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;

    </div>
  )
}

export default Pdf
