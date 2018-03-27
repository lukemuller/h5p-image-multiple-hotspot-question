var H5PEditor = H5PEditor || {};
var H5PPresave = H5PPresave || {};

H5PPresave['H5P.ImageMultipleHotspotQuestion'] = function (content, finished) {
  var presave = H5PEditor.Presave;

  if (isContentInValid()) {
    throw {
      name: 'Invalid Find Multiple Hotspots Error',
      message: "Could not find expected semantics in content."
    };
  }

  var correctHotspots = content.imageMultipleHotspotQuestion.hotspotSettings.hotspot
    .filter(function (hotspot) {
      return hotspot.userSettings.correct;
    }).length;

  var score = useFixedNumberOfHotspots() ? content.imageMultipleHotspotQuestion.hotspotSettings.numberHotspots : correctHotspots;

  presave.validateScore(score);

  if (finished) {
    finished({maxScore: score});
  }

  function isContentInValid() {
    return !presave.checkNestedRequirements(content, 'content.imageMultipleHotspotQuestion.hotspotSettings.hotspot') || !Array.isArray(content.imageMultipleHotspotQuestion.hotspotSettings.hotspot);
  }

  function useFixedNumberOfHotspots() {
    return hasFixedNumberOfHotspots() && isFixedNumberOfHotspotsLessThanCorrectHotspots();
  }

  function hasFixedNumberOfHotspots(){
    return presave.checkNestedRequirements(content, 'content.imageMultipleHotspotQuestion.hotspotSettings.numberHotspots');
  }

  function isFixedNumberOfHotspotsLessThanCorrectHotspots() {
    return content.imageMultipleHotspotQuestion.hotspotSettings.numberHotspots <= correctHotspots;
  }
};
