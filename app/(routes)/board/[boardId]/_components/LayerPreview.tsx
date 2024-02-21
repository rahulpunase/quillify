import { useStorage } from "@/liveblocks.config";
import { ToolSelectedType } from "@/store/canvas";
import React, { memo } from "react";
import Rectangle from "./Shapes/Rectangle";

type LayerPreviewProps = {
  id: string;
};

const LayerPreview = memo(({ id }: LayerPreviewProps) => {
  const layers = useStorage((root) => root.layers);
  const layer = layers.get(id);

  if (!layer) {
    return null;
  }

  if (layer.type === ToolSelectedType.Rectangle) {
    return <Rectangle id={id} layer={layer} />;
  }
  return <div>LayerPreview</div>;
});

LayerPreview.displayName = "LayerPreview";

export default LayerPreview;
