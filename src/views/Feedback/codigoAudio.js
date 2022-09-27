function checkAnswer() {
    if (btnEnabled) {
      uploadAudioAsync(uri);
    } else {
      Alert.alert("Primeiro dê o feedback antes de proceder!");
    }
  }

  //Funcionou!!!!!!!!!
  /*async function playAudio() {
    const { sound } = await Audio.Sound.createAsync(
      { uri: uri },
      { shouldPlay: false }.uri
    );
    setSound(sound);
    setPlaying(true);
    console.log("Playing Sound");
    console.log(sound);
    await sound.playAsync();
  }*/

  async function uploadAudioAsync(uri) {
    console.log("Uploading " + uri);
    let apiUrl = "http://YOUR_SERVER_HERE/upload";
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append("file", {
      uri,
      name: `recording.${fileType}`,
      type: `audio/x-${fileType}`,
    });

    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    console.log("POSTing " + uri + " to " + apiUrl);
    console.log(options);
    // return fetch(apiUrl, options);
  }

  async function startRecording() {
    if (btnEnabled == false) {
      console.log(btnEnabled);
    } else {
      setBtnEnabled(false);
    }
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      //console.log(recording);

      setEstado("Gravando Feedback....");
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uril = recording.getURI();

    setUri(uril);
    console.log("Recording stopped and stored at", uril);
    setBtnEnabled(true);
  }