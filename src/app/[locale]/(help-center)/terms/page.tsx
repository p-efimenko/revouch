import NextLink from 'next/link'

import { Stack, IconButton, Typography } from '@mui/material'
import { Icon } from '@/components/ui'

export default function Terms() {
  return (
    <Stack maxWidth="600px" alignItems="flex-start" margin="0 auto" pt={24} pb={102} px={{ xs: 32, md: 0 }}>
      <NextLink href="/login">
        <IconButton
          sx={{ verticalAlign: 'top' }}
          aria-label="Back to login"
        >
          <Icon name="arrow-left" size={16} />
        </IconButton>
      </NextLink>

      <Stack
        mt={48}
        mb={22}
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h1">Terms of Service</Typography>

        <Typography variant="p5" color="black.500">
          September 15, 2024
        </Typography>
      </Stack>

      <Stack spacing={22}>
        <Typography variant="p2">
          {'Don\'t bother typing “lorem ipsum” into Google translate. If you already tried, you may have gotten anything from "NATO" to "China", depending on how you capitalized the letters. The bizarre translation was fodder for conspiracy theories, but Google has since updated its “lorem ipsum” translation to, boringly enough, “lorem ipsum”.'}
        </Typography>

        <Typography variant="p2">
          {'One brave soul did take a stab at translating the almost-not-quite-Latin. According to The Guardian, Jaspreet Singh Boparai undertook the challenge with the goal of making the text “precisely as incoherent in English as it is in Latin - and to make it incoherent in the same way”. As a result, “the Greek "eu" in Latin became the French "bien" [...] and the "-ing" ending in "lorem ipsum" seemed best rendered by an "-iendum" in English”.'}
        </Typography>

        <Typography variant="p2">
          {`Here is the classic lorem ipsum passage Followers by Boparai's odd, yet
          mesmerizing version: <br />
          “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
          hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus
          rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat.
          Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla
          consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus
          dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit
          amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper
          risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu.”`}
        </Typography>

        <Typography variant="p2">
          {`Don't bother typing “lorem ipsum” into Google translate. If you
          already tried, you may have gotten anything from "NATO" to "China",
          depending on how you capitalized the letters. The bizarre translation
          was fodder for conspiracy theories, but Google has since updated its
          “lorem ipsum” translation to, boringly enough, “lorem ipsum”.`}
        </Typography>

        <Typography variant="h4" gutterBottom>
          Who May Use the Services
        </Typography>

        <Typography variant="p2">
          {`Don't bother typing “lorem ipsum” into Google translate. If you
          already tried, you may have gotten anything from "NATO" to "China",
          depending on how you capitalized the letters. The bizarre translation
          was fodder for conspiracy theories, but Google has since updated its
          “lorem ipsum” translation to, boringly enough, “lorem ipsum”.`}
        </Typography>

        <Typography variant="p2">
          {`One brave soul did take a stab at translating the
          almost-not-quite-Latin. According to The Guardian, Jaspreet Singh
          Boparai undertook the challenge with the goal of making the text
          “precisely as incoherent in English as it is in Latin - and to make it
          incoherent in the same way”. As a result, “the Greek "eu" in Latin
          became the French "bien" [...] and the "-ing" ending in "lorem ipsum"
          seemed best rendered by an "-iendum" in English.”`}
        </Typography>

        <Stack spacing={16} width="286px">
          <Typography component="span" variant="h5">
            - Who May Use the Services
          </Typography>
          <Typography component="span" variant="h5">
            - Content on the Services
          </Typography>
          <Typography component="span" variant="h5">
            - Your Rights and Grant of Rights in the Content
          </Typography>
          <Typography component="span" variant="h5">
            - Fantastic to work with great communication
          </Typography>
        </Stack>

        <Typography variant="h4">Your Rights and Grant of Rights in the Content</Typography>

        <Typography variant="p2">
          {`Don't bother typing “lorem ipsum” into Google translate. If you
          already tried, you may have gotten anything from "NATO" to "China",
          depending on how you capitalized the letters. The bizarre translation
          was fodder for conspiracy theories, but Google has since updated its
          “lorem ipsum” translation to, boringly enough, “lorem ipsum”.`}
        </Typography>

        <Typography variant="h4">Who May Use the Services</Typography>

        <Typography variant="p2">
          {`Don't bother typing “lorem ipsum” into Google translate. If you
          already tried, you may have gotten anything from "NATO" to "China",
          depending on how you capitalized the letters. The bizarre translation
          was fodder for conspiracy theories, but Google has since updated its
          “lorem ipsum” translation to, boringly enough, “lorem ipsum”.`}
        </Typography>

        <Typography variant="p2">
          {`One brave soul did take a stab at translating the
          almost-not-quite-Latin. According to The Guardian, Jaspreet Singh
          Boparai undertook the challenge with the goal of making the text
          “precisely as incoherent in English as it is in Latin - and to make it
          incoherent in the same way”. As a result, “the Greek "eu" in Latin
          became the French "bien" [...] and the "-ing" ending in "lorem ipsum"
          seemed best rendered by an "-iendum" in English.”`}
        </Typography>
      </Stack>
    </Stack>
  )
}
