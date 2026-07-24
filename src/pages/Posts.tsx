import { useMemo, useState } from "react";
import { FileText } from "lucide-react";

import { getPosts } from "@/api/postsApi";
import PageLayout from "@/components/layout/PageLayout/PageLayout";
import PostCard from "@/components/posts/PostCard/PostCard";
import AsyncContent from "@/components/shared/AsyncContent/AsyncContent";
import ContentPanel from "@/components/shared/ContentPanel/ContentPanel";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import FilterSelect from "@/components/shared/FilterSelect/FilterSelect";
import Pagination from "@/components/shared/Pagination/Pagination";
import SearchFilterBar from "@/components/shared/SearchFilterBar/SearchFilterBar";
import { useAsyncData } from "@/hooks/useAsyncData";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { PostType } from "@/types/post";
import { POSTS_PER_PAGE, SEARCH_DEBOUNCE_MS } from "@/utils/constants";

const PostsPage = () => {
  const { data: posts, loading, error } = useAsyncData<PostType[]>("posts", getPosts, []);
  const [query, setQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { debouncedValue: debouncedQuery, isPending: isSearching } = useDebouncedValue(
    query,
    SEARCH_DEBOUNCE_MS
  );

  const userOptions = useMemo(() => {
    return [...new Set(posts.map((post) => post.userId))].sort((a, b) => a - b);
  }, [posts]);

  const userFilterOptions = useMemo(
    () => [
      { value: "all", label: "All users" },
      ...userOptions.map((userId) => ({
        value: String(userId),
        label: `User ${userId}`,
      })),
    ],
    [userOptions]
  );

  const filteredPosts = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesQuery =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.body.toLowerCase().includes(normalizedQuery);

      const matchesUser =
        selectedUserId === "all" || post.userId === Number(selectedUserId);

      return matchesQuery && matchesUser;
    });
  }, [posts, debouncedQuery, selectedUserId]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const handleUserFilterChange = (value: string) => {
    setSelectedUserId(value);
    setCurrentPage(1);
  };

  return (
    <PageLayout>
      <ContentPanel
        title="Posts"
        subtitle="Search and browse your posts in a structured list"
        icon={<FileText size={20} />}
      >
        <SearchFilterBar
          value={query}
          onChange={handleQueryChange}
          placeholder="Search posts by title or content"
          filterSlot={
            <FilterSelect
              id="user-filter"
              label="Filter by user"
              value={selectedUserId}
              onChange={handleUserFilterChange}
              options={userFilterOptions}
              placeholder="All users"
            />
          }
        />

        <div className="mt-6">
          <AsyncContent
            loading={loading}
            error={error}
            isSearching={isSearching}
            skeletonCount={POSTS_PER_PAGE}
            skeletonVariant="post"
          >
            {paginatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {paginatedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    body={post.body}
                    userId={post.userId}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No posts found"
                description="Try a different keyword or user filter to see more results."
              />
            )}
          </AsyncContent>
        </div>

        {!loading && !isSearching && !error ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : null}
      </ContentPanel>
    </PageLayout>
  );
};

export default PostsPage;
