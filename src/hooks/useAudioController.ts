import TrackPlayer, {
  Track,
  usePlaybackState,
  State,
} from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import {AudioData} from 'src/@types/audio';
import { getPlayerState, updateOnGoingAudio } from 'src/store/player';

const updateQueue = async (data: AudioData[]) => {
  const lists: Track[] = data.map(item => {
    return {
      id: item.id,
      title: item.title,
      url: item.file,
      artwork: item.poster || require('../assets/music.png'),
      artist: item.owner.name,
      genre: item.category,
      isLiveStream: true,
    };
  });
  await TrackPlayer.add([...lists]);
};

const useAudioController = () => {
  const playbackState = usePlaybackState() as {state?: State};
  const {onGoingAudio} = useSelector(getPlayerState)
  const dispatch = useDispatch()

  const isPlayerReady = playbackState.state !== undefined;

  const onAudioPress = async (item: AudioData, data: AudioData[]) => {
    if (!isPlayerReady) {
      // Playing audio for the first time.
      await updateQueue(data);
      const index = data.findIndex(audio => audio.id === item.id);
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      dispatch(updateOnGoingAudio(item))
    }

    if (playbackState.state === State.Playing) {
      // audio is already playing so pause
      await TrackPlayer.pause();
    }
  };

  return {onAudioPress};
};

export default useAudioController;
