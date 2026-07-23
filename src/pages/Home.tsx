import { useNavigate } from "react-router-dom";
import { FileText, ImageIcon } from "lucide-react";

import { getPhotos } from "../api/photosApi";
import { getPosts } from "../api/postsApi";
import SliderPhotoCard from "../components/layout/home/SliderPhotoCard/SliderPhotoCard";
import SliderPostCard from "../components/layout/home/SliderPostCard/SliderPostCard";
import PageLayout from "../components/layout/PageLayout/PageLayout";
import AsyncContent from "../components/shared/AsyncContent/AsyncContent";
import ContentPanel from "../components/shared/ContentPanel/ContentPanel";
import ContentSlider from "../components/shared/ContentSlider/ContentSlider";
import HeroBanner from "../components/shared/HeroBanner/HeroBanner";
import QuickLinkCard from "../components/shared/QuickLinkCard/QuickLinkCard";
import Button from "../components/ui/Button/Button";
import { useAsyncData } from "../hooks/useAsyncData";
import { useAppSelector } from "../hooks/useAppSelector";
import { type PhotoType } from "../types/photo";
import { type PostType } from "../types/post";
import { PREVIEW_COUNT, ROUTES } from "../utils/constants";

const Home = () => {
  const navigate = useNavigate();
  const { username } = useAppSelector((state) => state.auth);

  const {
    data: posts,
    loading: loadingPosts,
    error: postsError,
  } = useAsyncData<PostType[]>("home-posts", getPosts, []);

  const {
    data: photos,
    loading: loadingPhotos,
    error: photosError,
  } = useAsyncData<PhotoType[]>("home-photos", getPhotos, []);

  const previewPosts = posts.slice(0, PREVIEW_COUNT);
  const previewPhotos = photos.slice(0, PREVIEW_COUNT);

  return (
    <PageLayout>
      <HeroBanner
        username={username}
        postsCount={posts.length}
        photosCount={photos.length}
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <QuickLinkCard
          title="Browse all posts"
          description="Search, filter, and paginate through every post."
          icon={<FileText size={22} />}
          accent="indigo"
          onClick={() => navigate(ROUTES.posts)}
        />
        <QuickLinkCard
          title="Explore photos"
          description="Scroll through the full photo gallery collection."
          icon={<ImageIcon size={22} />}
          accent="violet"
          onClick={() => navigate(ROUTES.photos)}
        />
      </section>

      <section className="grid grid-cols-1 items-stretch gap-8 xl:grid-cols-2">
        <ContentPanel
          title="Latest posts"
          subtitle="A quick snapshot of the most recent posts"
          variant="accent"
          fillHeight
          icon={<FileText size={20} />}
          action={
            <Button variant="outline" size="sm" onClick={() => navigate(ROUTES.posts)}>
              View all
            </Button>
          }
        >
          <AsyncContent
            loading={loadingPosts}
            error={postsError}
            skeletonCount={1}
            skeletonVariant="slider"
            className="flex flex-1 flex-col"
          >
            <ContentSlider
              accent="indigo"
              items={previewPosts}
              getItemKey={(post) => post.id}
              renderItem={(post) => (
                <SliderPostCard
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  userId={post.userId}
                  onClick={() => navigate(ROUTES.posts)}
                />
              )}
            />
          </AsyncContent>
        </ContentPanel>

        <ContentPanel
          title="Featured photos"
          subtitle="A polished look at the latest images"
          fillHeight
          icon={<ImageIcon size={20} />}
          action={
            <Button variant="outline" size="sm" onClick={() => navigate(ROUTES.photos)}>
              View all
            </Button>
          }
        >
          <AsyncContent
            loading={loadingPhotos}
            error={photosError}
            skeletonCount={1}
            skeletonVariant="slider"
            className="flex flex-1 flex-col"
          >
            <ContentSlider
              accent="violet"
              items={previewPhotos}
              getItemKey={(photo) => photo.id}
              renderItem={(photo) => (
                <SliderPhotoCard
                  id={photo.id}
                  title={photo.title}
                  imageUrl={photo.url}
                  fullImageUrl={photo.thumbnailUrl}
                  albumId={photo.albumId}
                  onClick={() => navigate(ROUTES.photos)}
                />
              )}
            />
          </AsyncContent>
        </ContentPanel>
      </section>
    </PageLayout>
  );
};

export default Home;
