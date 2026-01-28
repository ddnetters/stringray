// src/pr-commenter.ts
import * as github from '@actions/github';
import * as core from '@actions/core';

const COMMENT_MARKER = '<!-- stringray-comment -->';

export async function postOrUpdateComment(body: string): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    core.warning('GITHUB_TOKEN not available. Skipping PR comment.');
    return;
  }

  const context = github.context;

  if (!context.payload.pull_request) {
    core.debug('Not a pull request. Skipping comment.');
    return;
  }

  const octokit = github.getOctokit(token);
  const { owner, repo } = context.repo;
  const prNumber = context.payload.pull_request.number;

  const markedBody = `${COMMENT_MARKER}\n${body}`;

  // Find existing StringRay comment
  const { data: comments } = await octokit.rest.issues.listComments({
    owner,
    repo,
    issue_number: prNumber
  });

  const existingComment = comments.find(
    (c: { body?: string }) => c.body?.includes(COMMENT_MARKER)
  );

  if (existingComment) {
    // Update existing comment
    await octokit.rest.issues.updateComment({
      owner,
      repo,
      comment_id: existingComment.id,
      body: markedBody
    });
    core.info(`Updated PR comment #${existingComment.id}`);
  } else {
    // Create new comment
    const { data: newComment } = await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: markedBody
    });
    core.info(`Created PR comment #${newComment.id}`);
  }
}
