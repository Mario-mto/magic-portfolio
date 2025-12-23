"use client";

import { Column, Heading, Text } from "@once-ui-system/core";

export default function GalleryView() {
  return (
    <Column padding="xl" horizontal="center" align="center">
      <Heading as="h1" variant="display-strong-m">
        Gallery is no longer available
      </Heading>
      <Text variant="body-default-m" onBackground="neutral-weak" marginTop="12">
        This section has been removed from the portfolio.
      </Text>
    </Column>
  );
}
