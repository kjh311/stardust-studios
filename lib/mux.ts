import Mux from "@mux/mux-node";

const muxClient = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export const createVideoAsset = async (url: string) => {
  try {
    const asset = await muxClient.video.assets.create({
      inputs: [{ url }],
      playback_policy: ["public"],
    });
    return asset;
  } catch (error) {
    console.error("Mux Asset Creation Error:", error);
    throw error;
  }
};

export const getPlaybackId = (asset: Mux.Video.Asset) => {
  return asset.playback_ids?.[0]?.id;
};
